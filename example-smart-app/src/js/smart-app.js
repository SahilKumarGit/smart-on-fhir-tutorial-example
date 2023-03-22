async function getData() {
    return new Promise((resolve, reject) => {
        console.log('shart-app-promise')
        FHIR.oauth2.ready((smart) => {
            if (smart.hasOwnProperty('patient')) {
                var patient = smart.patient;
                var pt = patient.read();

                var obv = smart.patient.api.fetchAll({
                    type: 'Observation',
                    query: {
                        code: {
                            $or: [
                                'http://loinc.org|8310-5',
                                'http://loinc.org|8302-2',
                            ]
                        }
                    }
                });
                Promise.all([pt, obv]).then(([patient, obv]) => resolve({ patient, obv }))
                    .catch(error => reject(error.message));
                // ----------------
            } else {
                reject(`smart.hasOwnProperty('patient') return undefiend.`)
            }
        }, (error) => {
            reject(error.message)
        });
    })

}

async function dateChange() {
    return await FHIR.oauth2.ready(client => {
        const patientId = 'smart-1288992'; // replace with the actual patient ID
        const updatedPatient = {
            resourceType: 'Patient',
            id: patientId,
            text: {
                status: "generated",
                div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">Daniel Adams</div>"
            },
            identifier: [
                {
                    use: "official",
                    type: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                code: "MR",
                                display: "Medical Record Number"
                            }
                        ],
                        text: "Medical Record Number"
                    },
                    system: "http://hospital.smarthealthit.org",
                    value: "smart-1288992"
                }
            ],
            active: true,
            name: [
                {
                    use: "official",
                    family: "Adams",
                    given: [
                        "Daniel",
                        "X"
                    ]
                }
            ],
            telecom: [
                {
                    system: "email",
                    value: "daniel.adams@example.com"
                },
                {
                    system: "email",
                    value: "daniel2.adams@example.com"
                }
            ],
            gender: "male",
            birthDate: "1925-12-23",
            address: [
                {
                    use: "home",
                    line: [
                        "1 Hill Ave"
                    ],
                    city: "Tulsa",
                    state: "OK",
                    postalCode: "74117",
                    country: "USA"
                }
            ],
            generalPractitioner: [
                {
                    reference: "Practitioner/smart-Practitioner-71614502"
                }
            ]
        };
        return client.update({
            resourceType: 'Patient',
            id: patientId,
            body: updatedPatient
        });
    }, (error) => {
        console.log('error: ', error)
    })
}
window.getData = getData;
window.dateChange = dateChange;

console.log('shart-app')