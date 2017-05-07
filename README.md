# onboardguru

> Onboard a practitioner like a pro

## Usage:

**Add to HEAD**

```
<link href=//static.appointmentguru.co/onboardguru/latest/static/css/app.9920d6ccb83035c1dad96d71f621d5ab.css rel=stylesheet>
```

**Place where you would like the widget to display:**

```
<div id=appointmentguruonboarder></div>
```

**Add just before `body` end tag**

```
<script type=text/javascript src=//static.appointmentguru.co/onboardguru/latest/static/js/manifest.a4a0bdd0ae2ec61dc84f.js></script>
<script type=text/javascript src=//static.appointmentguru.co/onboardguru/latest/static/js/vendor.5497f5cc907e29cd9be4.js></script>
<script type=text/javascript src=//static.appointmentguru.co/onboardguru/latest/static/js/app.f9c75c4ef3bcc6e36718.js></script>
```

**Note:** you can (and should) replace `latest` with an explicit version.

## Release a package:

```
ansible-playbook release.yml --vault-password-file=.vault_pass.txt
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
