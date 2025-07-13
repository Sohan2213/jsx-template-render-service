from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import requests

app = FastAPI()

class RenderRequest(BaseModel):
    template: str
    data: dict
    outputType: str = "pdf"

RENDERER_URL = "http://localhost:3000/render"
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
def index():
    return FileResponse("static/index.html")

@app.post("/preview", response_class=HTMLResponse)
def preview(req: RenderRequest):
    try:
        payload = req.dict()
        print(f"🛰️ [PREVIEW] Request received: {payload}")

        resp = requests.post(RENDERER_URL, json=payload)
        print(f"📥 [PREVIEW] Renderer response: {resp.status_code}")

        if not resp.ok:
            return HTMLResponse(
                content=f"<pre>Renderer Error:\nStatus: {resp.status_code}\n{resp.text}</pre>",
                status_code=500
            )

        return HTMLResponse(content=resp.text)

    except Exception as e:
        print(f"❌ [PREVIEW] Exception: {e}")
        return HTMLResponse(content=f"<pre>Internal Server Error:\n{str(e)}</pre>", status_code=500)

@app.post("/render", response_class=FileResponse)
def render_file(req: RenderRequest):
    try:
        payload = req.dict()
        print(f"🛰️ [RENDER] Request received: {payload}")

        resp = requests.post(RENDERER_URL, json=payload)
        print(f"📥 [RENDER] Renderer response: {resp.status_code}")

        if not resp.ok:
            raise HTTPException(status_code=500, detail=resp.text)

        output_file = f"output.{req.outputType}"
        with open(output_file, "wb") as f:
            f.write(resp.content)

        return FileResponse(
            output_file,
            media_type='application/pdf',
            headers={"Content-Disposition": "inline; filename=rendered.pdf"}
)


    except Exception as e:
        print(f"❌ [RENDER] Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
