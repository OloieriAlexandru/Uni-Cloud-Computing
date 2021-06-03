const {
    Datastore
} = require('@google-cloud/datastore');

GPC_DATASTORE_SUBSCRIPTIONS_KIND = "Subscription";

class SubscriptionsRepository {
    constructor() {
        this.datastore = new Datastore();
    }

    async getAllActive() {
        const query = this.datastore
            .createQuery(GPC_DATASTORE_SUBSCRIPTIONS_KIND)
            .filter('status', '=', 'active');
        const [subscriptions] = await this.datastore.runQuery(query);
        return subscriptions;
    }

    async save(savedSubscription) {
        await this.datastore.save(savedSubscription);
    }
};

module.exports = SubscriptionsRepository;
