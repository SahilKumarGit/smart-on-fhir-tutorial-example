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
window.getData = getData;
console.log('shart-app')