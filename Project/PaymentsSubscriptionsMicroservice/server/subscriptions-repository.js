const {
    Datastore
} = require('@google-cloud/datastore');

GPC_DATASTORE_SUBSCRIPTIONS_KIND = "Subscription";

class SubscriptionsRepository {
    constructor() {
        this.datastore = new Datastore();
    }

    async get(email) {
        const query = this.datastore
            .createQuery(GPC_DATASTORE_SUBSCRIPTIONS_KIND)
            .filter('email', '=', email)
            .filter('status', '=', 'active');
        const [subscriptions] = await this.datastore.runQuery(query);
        if (subscriptions.length == 0) {
            return null;
        }
        return subscriptions[0];
    }

    async create(subscription) {
        const key = this.datastore.key(GPC_DATASTORE_SUBSCRIPTIONS_KIND);
        const subscriptionToInsert = {
            key: key,
            data: subscription
        };
        await this.datastore.save(subscriptionToInsert);
        return subscriptionToInsert;
    }
};

module.exports = SubscriptionsRepository;
