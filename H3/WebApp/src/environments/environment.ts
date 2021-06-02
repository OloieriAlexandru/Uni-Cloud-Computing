export const environment = {
  production: false,
  // Local Azure Function: 'http://localhost:7071/api/EvaluationRequestHandler'
  // Local Evaluator Function Server: 'http://localhost:3000'
  evaluationURL:
    'https://europe-west1-pump-it-up-314917.cloudfunctions.net/evaluation-submitter-function',
  evaluationsURL:
    'https://problems-microservice-dot-pump-it-up-314917.ew.r.appspot.com',
  problemsURL:
    'https://problems-microservice-dot-pump-it-up-314917.ew.r.appspot.com',
  authURL: 'https://cloud-auth-teddy.azurewebsites.net',
  paymentsURL: 'http://localhost:3334',
  stripePublicKey:
    'pk_test_51IxXTwBMiXaQhLWLoMCXZhyE9UrrPCWBToU0vwmxpUHbgmADsIc1Ow4wQkwVdfDIG7XDjTn4xGcFECC6stNiHF6700jvtLnKJb',
};
