export const environment = {
  production: false,
  // Local Azure Function: 'http://localhost:7071/api/EvaluationRequestHandler',
  evaluationURL: 'https://europe-west1-pump-it-up-314917.cloudfunctions.net/evaluation-submitter-function',
  evaluationsURL: 'http://51.144.2.215:7777',
  problemsURL: 'https://problems-microservice-dot-pump-it-up-314917.ew.r.appspot.com',
  authURL: 'https://cloud-auth-teddy.azurewebsites.net',
  stripePublicKey: 'pk_test_51IxXTwBMiXaQhLWLoMCXZhyE9UrrPCWBToU0vwmxpUHbgmADsIc1Ow4wQkwVdfDIG7XDjTn4xGcFECC6stNiHF6700jvtLnKJb'
};
