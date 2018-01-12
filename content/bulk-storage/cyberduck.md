/*
Title: Application | Cyberduck
Sort: 7
*/

[Cyberduck](https://cyberduck.io) is a libre FTP, SFTP, WebDAV, Amazon S3,
OpenStack Swift, Backblaze B2, Microsoft Azure & OneDrive, Google Drive and
Dropbox browser for Mac and Windows.

When Cyberduck has launched you will be presented with the Connections view with
your list of already existing external storage connections, or a blank list if
this is your first time. On the top-left corner, you'll want to `Open
Connection` to create a new connection to Bulk Storage. From there you can
create your new connection to Bulk Storage.

## Standard Login

For your new connection, you'll want to select the `Swift (OpenStack Object
Storage)` connection type for standard OpenStack Keystone authentication, which
will authenticate to all of the containers in your Bulk Storage account, you
should enter your specific credentials as follows:

```
    Server               - keystone.ca-ns-1.clouda.ca
    Port                 - 8443
    Tenant ID:Access Key - Your Tenant ID & Username in colon separated format.
                           ex. 123d8dc22ba643aeba8df87538946450:user@domain.ca
    Password             - Your Cloud-A Password
```


Alternatively, you can follow the instructions in the [official Cyberduck Cloud-A howto](https://trac.cyberduck.io/wiki/help/en/howto/clouda) docs.

## Container Keys Login

For authentication using container specific API keys, which will
authenticate only to the Bulk Storage container of your choice requires using a specialized `.cyberduckprofile` [Cyberduck Connection profile](https://trac.cyberduck.io/wiki/help/en/howto/profiles).

You'll want to create a new `clouda.cyberduckprofile` file, and open it in your favourite editor. Then use the following template to create a Container Keys compatible Cyberduck profile.

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Protocol</key>
    <string>swift</string>
    <key>Vendor</key>
    <string>clouda</string>
    <key>Description</key>
    <string>Cloud-A Container Keys Bulk Storage</string>
    <key>Default Hostname</key>
    <string>ca-ns-1.bulkstorage.ca</string>
    <key>Context</key>
    <string>/keys_auth/{{ container name }}/v1.0/auth/tokens</string>
    <key>Schemes</key>
    <string>https</string>
    <key>Hostname Configurable</key>
    <false/>
    <key>Port Configurable</key>
    <false/>
    <key>Password Placeholder</key>
    <string>{{ Full-Key Value }}</string>
    <key>Username Placeholder</key>
    <string>{{ Tenant ID }}:Full-Key</string>
  </dict>
</plist>
```

Make sure to replace the values wrapped in `{{ }}` with your account and
container specific information. Once the file is saved, you should be able to
simply open it, and Cyberduck will open with your new profile ready to use.

## Testing / Debugging

In order to test the connection, you'll need to press the "Connect" button in
your Open Connection screen. If the connection is successful, the profile will
save and you will be shown a list of your authenticated containers.

If the connection fails with a Certificate, DNS, or 404 Error, make sure you
have the Server and Port values set. In some cases Cyberduck will attempt to
automatically detect the type of connection you're trying to make based on the
information you've added or changed to the connection form. This will quietly
change the backend to something like "S3" or "WebDAV" without prompting you and
cause your connections to fail with a 400 error. To remedy this, change the
connection type in the drop down menu back to Swift.
