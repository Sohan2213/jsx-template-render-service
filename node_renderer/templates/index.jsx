import React from 'react';
// import '../theme.css';
import Section from '../components/Section';
import Field from '../components/Field';
import FieldRow from '../components/FieldRow';
import CheckboxGroup from '../components/CheckboxGroup';

const Onboarding = ({ data, themeCss }) => (
    <html>
        <head>
            <meta charSet="utf-8" />
            <style>{themeCss}</style>
        </head>
        <body>
            <div style={{ padding: '40px' }}>
                {/* Bank logo */}
                <img src="https://accountopeningdev.standardbank.co.mw/images/icons/logo.png" alt="Bank Logo" width="150" />

                {/* Form Title */}
                <h2 style={{ color: 'var(--primary-color)', marginTop: '20px' }}>ACCOUNT OPENING FORM – PERSONAL</h2>

                <Section title="Section 3 - Personal details">
                    <FieldRow>
                        <CheckboxGroup
                            label="Gender"
                            options={["Male", "Female"]}
                            selected={data.gender}
                            inline
                        />
                        <Field label="Title" value={data.title} />
                    </FieldRow>

                    <FieldRow>
                        <Field label="First name" value={data.firstName} />
                        <Field label="Other names" value={data.otherNames} />
                    </FieldRow>

                    <FieldRow>
                        <Field label="Last name (Surname)" value={data.lastName} />
                        <Field label="Marital Status" value={data.maritalStatus} />
                    </FieldRow>

                    <FieldRow>
                        <Field
                            label="Date of birth (DD-MM-YYYY)"
                            value={data.dob}
                        />
                        <Field
                            label="If Married please provide Spouse’s name"
                            value={data.spouseName}
                        />
                    </FieldRow>

                    <FieldRow>
                        <Field label="Maiden Name" value={data.maidenName} />
                        <Field
                            label="Mother’s Maiden Name"
                            value={data.mothersMaidenName}
                        />
                    </FieldRow>

                    <div className="field-row">
                        <label className="field-label">ID Type</label>
                        <CheckboxGroup
                            options={["Passport", "Driving Licence", "Employer ID", "National ID"]}
                            selected={data.idTypes}
                            inline
                        />
                    </div>

                    <Field label="Other: Please Specify" value={data.idOtherType} />
                    <Field label="Identity Number" value={data.idNumber} />

                    <FieldRow>
                        <Field label="Issue date: (DD-MM-YYYY)" value={data.issueDate} />
                        <Field label="Expiry date: (DD-MM-YYYY)" value={data.expiryDate} />
                    </FieldRow>

                    <FieldRow>
                        <CheckboxGroup
                            label="Relation to Bank Staff"
                            options={["Yes"]}
                            selected={data.relatedToBankStaff}
                        />
                        <Field label="Relationship Type" value={data.relationshipType} />
                        <Field label="Full Name" value={data.bankStaffName} />
                    </FieldRow>
                </Section>
            </div>
        </body>
    </html>
);

export default Onboarding;
