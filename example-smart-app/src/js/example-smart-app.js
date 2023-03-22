(function (window) {
  window.extractData = function () {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart) {
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
        console.log({ patient })

        $.when(pt, obv).fail(onError);

        $.when(pt, obv).done(function (patient, obv) {
          // var byCodes = smart.byCodes(obv, 'code');
          console.log({ patient, obv })
          ret.resolve({ patient, obv });
        });
      } else {
        onError();
      }
    }

    FHIR.oauth2.ready(onReady, onError);
    return ret.promise();

  };

  window.drawVisualization = function ({ patient, obv }) {
    const { patient, obv } = { patient: patient, obv: obv }
    console.log({ patient, obv })
    $('#holder').show();
    $('#loading').hide();
    $('#patientsDetails').html(`
      <div class="card">
        <div class="card-header">
          patients Details: <b>${patient?.name[0]?.given.join(' ')} ${patient?.name[0]?.family} </b>
          ${patient?.active ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Inactive</span>'}</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <div>Birth Date: <b>${patient?.birthDate}</b></div>
            <div>Gender: <b>${patient?.gender}</b></div>
            <div>patients ID: <b>${patient?.id}</b></div>
            <br/>
            <h5>Contact Info:</h5>
            ${patient?.telecom?.map(each => `<div> ${each?.system}: ${each?.value}</div>`)}            
            <footer class="blockquote-footer">Last Update: <cite title="Source Title">${new Date(patient?.meta?.lastUpdated).getUTCDate()}</cite></footer>
          </blockquote>
        </div>
      </div>      
    `);
    // $('#fname').html(p.fname);
  };

})(window);

