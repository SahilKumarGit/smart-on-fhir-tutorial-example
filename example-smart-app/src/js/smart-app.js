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
    console.log('shart-app-promise')
    new Promise((resolve, reject) => {
        FHIR.oauth2.ready(async (smart) => {
            if (smart.hasOwnProperty('patient')) {
                const patent = await smart.patient.read()

                patent.telecom = [
                    {
                        system: "email",
                        value: "daniel.adams@example.com"
                    },
                    {
                        system: "email",
                        value: "daniel2.eee@example.com"
                    }
                ];
                const update = await smart.patient.update(patent);
                resolve(update)
            } else {
                reject(`smart.hasOwnProperty('patient') return undefiend.`)
            }
        }, (error) => {
            reject(error.message)
        });
    })

}
window.getData = getData;
window.dateChange = dateChange;

console.log('shart-app')