/*
Title: Swift CLI Basics
*/

The Bulk Storage CLI tools are a veritable force. After installing the
OpenStack CLI toolchain you're ready to become familiar with the swift client.

## The Fly-through

I'm going to take you through a hands-on walkthrough of the swift client. We'll
do some exploring, create a file, download, change ACLs, and clean up when
we're done.

Let's start by exploring our account.

```
$ swift stat
Account: AUTH_<tenant_id>
Containers: 0
Objects: 0
Bytes: 0
```

Looks like we don't have anything yet, you can see that there are 0 containers,
0 objects, taking up 0 bytes. So let's start by uploading a file. Note that 
this will create a container if one doesn't exist (it doesn't).

```
$ swift upload demo index.html
index.html
```

Now we can see the demo container has 1 object of 370 bytes.

```
$ swift stat demo
Account: AUTH_<tenant_id>
Container: demo
Objects: 1
Bytes: 370
Read ACL:
Write ACL:
Sync To:
Sync Key:
```

Next, check to see what's in the bucket.

```
$ swift list demo
index.html
```

We'll download the new file and see if it worked.

```
$ swift download demo index.html
index.html [auth 0.816s, headers 1.133s, total 1.134s, 0.012 MB/s]
$ cat index.html
<html>
...
</html>
```

Huzzah! Now let's make the container publicly accessible!

```
$ swift post -r ".r:*" demo
$ wget https://swift.ca-ns-1.clouda.ca:8443/v1/AUTH_<YOUR_TENANT_ID>/demo/index.html
...
HTTP request sent, awaiting response... 200 OK
Length: 370 [text/html]
Saving to: 'index.html'
100%[==========================================================>] 370
--.-K/s   in 0s
2014-05-28 21:49:40 (25.2 MB/s) - 'index.html' saved [370/370]
```

And now, let's clean up after ourselves.

```
$ swift delete demo
index.html
$ swift stat demo
Container 'demo' not found
```

This is just the tip of the iceberg, we'll be posting more thorough
documentation for the swift client, and APIs soon. Keep your eyes peeled!
