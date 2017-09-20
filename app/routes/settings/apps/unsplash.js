import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import UnsplashObject from 'ghost-admin/models/unsplash-integration';
import styleBody from 'ghost-admin/mixins/style-body';
import {inject as injectService} from '@ember/service';

export default AuthenticatedRoute.extend(styleBody, {
    config: injectService(),
    settings: injectService(),

    titleToken: 'Settings - Apps - Unsplash',
    classNames: ['settings-view-apps-unsplash'],

    beforeModel() {
        let settings = this.get('settings');

        if (settings.get('unsplash')) {
            return;
        }

        // server doesn't have any unsplash settings by default but it can provide
        // overrides via config:
        // - isActive: use as default but allow settings override
        // - applicationId: total override, no field is shown if present
        let unsplash = UnsplashObject.create({
            isActive: true
        });

        settings.set('unsplash', unsplash);

        return unsplash;
    },

    actions: {
        save() {
            this.get('controller').send('save');
        }
    }
});
