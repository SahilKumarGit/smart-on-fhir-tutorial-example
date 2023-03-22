
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
* @param {string} type 
*/
function getName(patent, type) {
    return {
        patent, type
    }
}