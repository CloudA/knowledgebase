/*
Title: Authenticate via CLI Tools
*/

In order to use the CLI tools, you must first authenticate to Cloud-A. This is
typically done by setting environment variables on your system which the
clients use automatically.

## OSX & Linux

The OpenStack RC file is a bash script which contains predefined environment
variables for your user. You can download it directly from your Dashboard under
your user drop down menu -> API Access
(https://dash.clouda.ca/project/api_access/). Make sure to save the file
somewhere that you will easily remember (typically in your user's home
directory).

Once you have downloaded your RC file, simply "source" the file prior to using
the CLI clients in your shell of choice.

```
source <PATH_TO_RC_FILE>
```

## Windows

The default OpenStack RC file is only built for UNIX-based systems, so it will
not work on Windows. This means that we have to set our environment variables
manually.

This can be accomplished by going into your Control Panel, scrolling to the
System and Security section, and clicking on System. From that window, you will
see an Advanced tab, wherein you can set your environment variables. Below is a
list of variables and what their corresponding values should be:

 - `OS_USERNAME` - The user that you use to login to Cloud A (typically your 
 email address)
 - `OS_PASSWORD` - Your Cloud A password
 - `OS_TENANT_NAME` - Typically the same as OS_USERNAME
 - `OS_AUTH_URL` - Set to http://api.cell01.clouda.ca:5000/v2.0/ Cloud A 
 Windows Environment
