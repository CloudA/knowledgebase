/*
Title: Application | CloudBerry Drive
Sort: 7
*/


![ExpanDrive Login](/img/content/bulk-storage/expandrivelogin.png)

## Standard Login

For standard OpenStack Keystone authentication, which will authenticate to
all of the containers in your Bulk Storage account, enter your specific
credentials as follows:

```
    auth server  - https://keystone.ca-ns-1.clouda.ca:8443/v2.0/tokens or https://keystone.ca-ns-1.clouda.ca:8443/v2.0
    username     - your Cloud-A login username
    api key      - your Cloud-A password
```

## Container Keys Login

For authentication using container specific API keys, which will
authenticate only to the Bulk Storage container of your choice enter your
credentials as follows:

```
    auth server  - https://ca-ns-1.bulkstorage.ca:8444/keys_auth/<container_name> (replace with the name of your container)
    username     - Full-Key or Read-Key
    api key      - your Container Key
```

## Testing / Debugging

Select “Validate Credentials” to ensure that the system has accepted
your credentials.

If Test Connection fails, ensure that you have entered your credentials
correctly. If you have entered your credentials correctly but are still
receiving a “Connection Failed” error message, ensure that you have the
correct ports open for Bulk Storage. Those ports are: 80, 443, 8443 and
8444.
