/*
Title: Container Specific API Keys
Sort: 3
*/

To generate read-only or full-access container keys, navigate to the storage 
dropdown menu in your Cloud-A dashboard and select containers. If you 
haven't created a container yet, create and name one. The container will 
show up under your container list on the containers screen. Select “Keys”

![Keys UI](/img/content/bulk-storage/container-keys1.png "Keys Button")

You will see that neither full-access or read-only keys are assigned to your 
container by default. To created the keys, select “Generate Initial Keys.”

![Generate Keys UI](/img/content/bulk-storage/container-keys2.png "Generate Keys")

Both the full-access and read-only keys will be generated and displayed on 
the screen. These are the keys you can use to authenticate to OpenStack 
Swift compatible software like CloudBerry or Cyberduck if you want to 
authenticate to a specific Bulk Storage container. At any time you can 
re-generate keys. The regeneration function serves to revoke your current 
container credentials, and generate new secure keys. This will help squelch 
the threat of any potentially leaked credentials by immediately rejecting 
all requests using the old keys, and certainly not having to worry about 
leaked account passwords per the OpenStack Swift default access requirements.

#### Generating your own keys 

Using your Swift credentials, create your Full or Read container keys using 
the dashboard, or Swift CLI tools. Replace mysupersecretkey123 with your 
desired read-only API key, and thiskeywillhavewriteaccess with your desired 
write access API key.

```asciidoc
$ swift post -m "Read-Key:mysupersecretkey123" <container_name> 
$ swift post -m "Full-Key:thiskeywillhavewriteaccess" <container_name>
```
    
Test accessing your container using your new keys using curl

```asciidoc
$ curl -v -H 'X-Container-Meta-Read-Key:mysupersecreykey123' https://swift.ca-ns-1.clouda.ca:8443/v1/AUTH_(tenant_id)/container_name
... 
< HTTP/1.1 200 OK 
< X-Container-Object-Count: 1 
<   test-file.txt  
$ curl -v -H 'X-Container-Meta-Read-Key:BAD_KEY_' https://swift.ca-ns-1.clouda.ca:8443/v1/AUTH_(tenant_id)/container_name
... 
< HTTP/1.1 401 Unauthorized 
< 401 Unauthorized: Auth Key invalid
```
    
## Compatibility Options

Authorization middleware has been released for Container Keys functionality
that enables integration with multiple existing swift authentication mechanisms. 
Both Keystone and legacy 'swauth' support has been added so that you can
leverage the extra security of Container Keys with any product that already
integrates with Bulk Storage / Openstack Swift.

#### Keystone Compatibility Example

```asciidoc
$ swift --os-auth-url https://ca-ns-1.bulkstorage.ca:8444/keys_auth/<container_name> \
        --os-tenant-id <tenant_id> \
        --os-username <Full | Read>-Key \
        --os-password <container-key> \
        list <container>
```

#### Swift-Auth Compatibility Example

```asciidoc
$ swift -A https://ca-ns-1.bulkstorage.ca:8444/keys_auth/<container_name> \
        -U <tenant_id>:<Full | Read>-Key \
        -K <container_key> \
        list <container>
```

## Using Natively python-swiftclient 

In a deployment scenario, it's likely that you won't be using curl to fetch 
or upload objects. The python-swiftclient library is the official OpenStack 
library used to interact with Swift deployments, and Bulk Storage. These 
examples are using a Python 2.7 REPL.

#### Download a file

We'll start by downloading the file we've been playing with via curl above 
using the read-only key, which has full read access to the container, but 
cannot perform any POST, PUT or DELETE requests. Notice that the second 
argument to get\_object, which is normally the auth token is set to None, as 
this shared key mechanism is separate from the Keystone authentication backend.

Note: You can get your full Swift API URL from the API Access section of the Dashboard.

```asciidoc
>>> import swiftclient
>>> read_key ='read-TEST-dff8555a-8c4d-4541-a629-3b6e7029803a'
>>> response = swiftclient.get_object(
    'https://swift.ca-ns-1.clouda.ca:8443/v2.0/AUTH_(tenant_id)', 
    None, 
    'test', 
    'index.html', 
    headers={
        'X-Container-Meta-Read-Key': read_key
    })
>>> response[1]
<html>
<body>
<h1>test</h1>
</body>
</html>
```

#### Upload a file

Uploading a file using the full-key is just as easy, in this example we'll 
upload a text file to Bulk Storage and read it back out again using the 
python-swiftclient library.

```asciidoc
>>> import swiftclient
>>> full_key = 'full-TEST-1e1c1fca-16ce-4aba-b89c-3c8b7911d1c4'
>>> swiftclient.put_object(
    'https://swift.ca-ns-1.clouda.ca:8443/v2.0/AUTH_(tenant_id)', 
    container='test', 
    name='another_file.txt', 
    contents='this is a test file', 
    headers={'X-Container-Meta-Full-Key': full_key})
>>> response = swiftclient.get_object(
    'https://swift.ca-ns-1.clouda.ca:8443/v2.0/AUTH_(tenant_id)', 
    None,
    'test', 
    'another_file.txt', 
    headers={
        'X-Container-Meta-Full-Key': full_key
    })
>>> response[1]
'this is a test file'
```
