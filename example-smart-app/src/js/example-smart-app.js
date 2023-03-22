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
                "http://loinc.org|8310-5",
                "http://loinc.org|8302-2",
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
    console.log({ patient, obv })
    // $('#holder').show();
    // $('#loading').hide();
    // $('#fname').html(p.fname);
    // $('#lname').html(p.lname);
    // $('#gender').html(p.gender);
    // $('#birthdate').html(p.birthdate);
    //$('#lymph').html(p.lymph);

    // Cerner SoF Tutorial Observations

    // $('#height').html(p.height);
    // $('#systolicbp').html(p.systolicbp);
    // $('#diastolicbp').html(p.diastolicbp);
    // $('#ldl').html(p.ldl);
    // $('#hdl').html(p.hdl);
  };

})(window);
