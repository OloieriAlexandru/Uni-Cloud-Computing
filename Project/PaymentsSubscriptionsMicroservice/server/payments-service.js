class PaymentsService {
    constructor(subscriptionsRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
    }

    async charge(chargeObj, token) {
        console.log('---------------------');

        console.log(chargeObj);
        console.log(token);

        console.log('======================');
        return null;
    }
};

module.exports = PaymentsService;
