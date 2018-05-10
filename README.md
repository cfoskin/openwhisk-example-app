# Openwhisk-example-app
POC for calling a Openwhisk action from an android app

# This assumes Openwhisk is provisioned on Openshift cluster

### Configuring wsk to use your OpenWhisk

```
AUTH_SECRET=$(oc get secret whisk.auth -o yaml | grep "system:" | awk '{print $2}' | base64 --decode) 
wsk property set --auth $AUTH_SECRET --apihost $(oc get route/openwhisk --template="{{.spec.host}}")
 ```
 
Set the Auth string which can be used for making calls to the action
```
export AUTH=`wsk property get --auth -i | awk '{ print $3; }'`
```

### Creating Openwhisk actions

Create a Javascript function that returns a reverse of the string passed in to it
eg: https://github.com/cfoskin/openwhisk-example-app/blob/master/index.js

An Openwhisk action can be created directly from a file or from a zip file 
To create an action directly from a file, the function must be a main function.

```javascript
function main(params){
	var result = params.name.split("").reverse().join("");
	return {result};
};
```

`wsk action create reverse reverse.js -i`

To create the action from a zip file, we need a package.json with the main set to the index.js file containing the function. We can then zip these up.

`zip reverse.zip *`

`wsk action create reverse reverse.zip --kind nodejs:6 -i`

### Listing your available Openwhisk actions
`wsk action list -i`

example output:
```Actions
/whisk.system/reverse                                                  private nodejs:6
```

### Invoking an action 

For our example action we need to pass a param in. The param is name and value is the string you wish to have reversed

`wsk action invoke reverse -r -i --param name "dlroW olleH"`

Example response:
`{ "result": "Hello World" }`


Note: `-v` can be used to get more info about the full request made and the response.

The curl command can be also used to send a request, the info above helps to build this command.

`curl -u $AUTH https://openwhisk-openwhisk.192.168.37.1.nip.io/api/v1/namespaces/_/actions/reverse\?blocking\=true\&result\=true -X POST -H "Content-Type: application/json" -d '{"name":"olleH"}' -k`

Response: 
`{"result":"Hello"}`


