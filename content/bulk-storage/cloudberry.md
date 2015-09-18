/*
Title: Application | CloudBerry Explorer
Sort: 6
*/

When CloudBerry Explorer has launched you will notice that the left side
of the screen represents your local systems folder directory and the right
represents cloud storage. On the cloud storage side click the source drop down
menu and select:

1. Select `<New Storage Account>`

2. Select Cloud-A as your cloud storage provider.

![Select Cloud-A Provider](/img/content/bulk-storage/cloudberryaccountselect.png)


## Standard Login

For standard OpenStack Keystone authentication, which will authenticate to 
all of the containers in your Bulk Storage account, enter your specific 
credentials as follows:

   - Display name: Email (Cloud-A login username)
   - User name: Email (Cloud-A login username)
   - Api key: Cloud-A password
   - Authentication Service: `https://keystone.ca-ns-1.clouda.ca:8443/v2.0/tokens`
   - Tenant Name: Email (Cloud-A login username)

![CloudBerry Default Login](/img/content/bulk-storage/cloudberrydefaultlogin.png)

## Container Keys Login

For authentication using container specific API keys, which will 
authenticate only to the Bulk Storage container of your choice enter your 
credentials as follows:

   - Display name: Container name
   - User name: Read-key or Full-access (depending on your choice)
   - Api key: Read-Only key or Full-Access key
   - Authentication Service: `https://ca-ns-1.bulkstorage.ca:8444/keys_auth/<container_name>/v2.0`
   - Tenant Name: Tenant ID

![CloudBerry Keys Login](/img/content/bulk-storage/cloudberrykeyslogin.png)

## Testing / Debugging

Select “Test Connection” to ensure that the system has accepted your 
credentials.

If Test Connection fails, ensure that you have entered your credentials
correctly. If you have entered your credentials correctly but are still
receiving a “Connection Failed” error message, ensure that you have the
correct ports open for Bulk Storage. Those ports are: 80, 443, 8443 and
8444.

If your credentials were entered correctly, the Bulk Storage container
you created in the first step will appear in the file directory in the
CloudBerry software.
