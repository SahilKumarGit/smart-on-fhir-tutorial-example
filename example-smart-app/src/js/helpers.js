
// helper functions
/**
* @param {{
*   resourceType: string,
*    id: string,
*    meta: {
*        versionId: number,
*        lastUpdated: string,
*        source: string
*    },
*    text: {
*        status: string,
*        div: string
*    },
*    identifier: {
*      use: string,
*      type: {
*          coding: {
*              system: string,
*              code: string,
*              display: string
*          }[],
*          text: string
*      },
*      system: string,
*      value: string
*    }[],
*    active: boolean,
*    name: {
*        use: string,
*        family: string,
*        given: string[]
*    }[],
*    telecom: {
*        system: string,
*        value: string
*    }[],
*    gender: string,
*    birthDate: string,
*    address: {
*        use: string,
*        line: string[],
*        city: string,
*        state: string,
*        postalCode: string,
*        country: string
*    }[],
*    generalPractitioner: {
*        reference: string
*    }[]
* }} patent 
* @param {{
*     "resourceType": string,
*     "id": string,
*     "meta": {
*         "versionId": string,
*         "lastUpdated": string,
*         "source": string
*     },
*     "text": {
*         "status": string,
*         "div": string
*     },
*     "identifier": {
*         "use": string,
*         "system": string,
*         "value": string
*     }[],
*     "status": string,
*     "category": {
*         "coding": {
*             "system": string,
*             "code": string,
*             "display": string
*         }[],
*         "text": string
*     }[],
*     "code": {
*         "coding": {
*             "system": string,
*             "code": string,
*             "display": string
*         }[],
*         "text": string
*     },
*     "subject": {
*         "reference": string
*     },
*     "effectiveDateTime": string,
*     "performer": {
*         "reference": string
*     }[],
*     "valueQuantity": {
*         "value": number,
*         "unit": string,
*         "system": string,
*         "code": string
*     }
* }[]} obv 
*/
function validate(patent, obv) {
    return {
        patent, obv
    }
}