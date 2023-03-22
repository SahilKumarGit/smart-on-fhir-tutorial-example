window.getData = async () => {
    return new Promise((resolve, reject) => {
        console.log('shart-app-promise')
        FHIR.oauth2.ready((smart) => {
            if (smart.hasOwnProperty('patient')) {
                var patient = smart.patient;
                var pt = patient.read();

                smart.patient.api.fetchAll({
                    type: 'Observation',
                    query: {
                        code: {
                            $or: [
                                'http://loinc.org|8310-5',
                                'http://loinc.org|8302-2',
                            ]
                        }
                    }
                })
                    .then(response => resolve({ patient, obv: response }))
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

console.log('shart-app')