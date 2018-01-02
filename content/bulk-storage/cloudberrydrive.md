/*
Title: Application | CloudBerry Drive
Sort: 7
*/

You can download CloudBerry Drive at [https://www.cloudberrylab.com/solutions/clouda](https://www.cloudberrylab.com/solutions/clouda)

After running the installer, you have to reboot to load the virtual disk driver. Once complete, open the options menu and create a new account.

![Options Menu](/img/content/bulk-storage/cloudberrydrive/1-options_menu.png)

![Add](/img/content/bulk-storage/cloudberrydrive/2-add_button.png)

Once you click on the Add button, select <Create a new account> under the Storage Account dropdown menu.

![Create Account](/img/content/bulk-storage/cloudberrydrive/3-create_account.png)

In the Add Storage Account window, select CloudA as the Storage Provider.

![CloudA](/img/content/bulk-storage/cloudberrydrive/4-clouda_select.png)

## Standard Login

For standard OpenStack Keystone authentication, which will authenticate to
all of the containers in your Bulk Storage account, enter your specific
credentials as follows:

```
    User Name                - your Cloud-A login username
    Api key                 - your Cloud-A password
    Authentication Service  - https://keystone.ca-ns-1.clouda.ca:8443/v2.0
    Tenant ID               - your Cloud-A tenant ID
```

## Container Keys Login

For authentication using container specific API keys, which will
authenticate only to the Bulk Storage container of your choice enter your
credentials as follows:

```
    auth server             - https://ca-ns-1.bulkstorage.ca:8444/keys_auth/<container_name> (replace with the name of your container)
    User Name               - Full-Key or Read-Key
    Api key                 - your Container Key
    Authentication Service  - https://keystone.ca-ns-1.clouda.ca:8443/v2.0
    Tenant ID               - your Cloud-A tenant ID
```

## Testing / Debugging

Select “Test Connection" to ensure that the system has accepted
your credentials.
