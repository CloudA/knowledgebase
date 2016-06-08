/*
Title: SSH Key Management
Sort: 9
*/

If you don't already use SSH, you'll need to generate a public and private key
pair for use with your instances. This keypair is a used to authenticate you
with your servers, and by default passworded SSH is disabled so you have better
security.

To generate your own SSH key, run

```asciidoc
$ ssh-keygen -t rsa
```

You can optionally provide a password to protect your key, by leaving the
password field empty you'll choose to not set one. Once your key is generated,
make sure you never share your private key at `~/.ssh/id_rsa`, and whenever
prompted for your SSH key, you provide the contents of your public key located
at `~/.ssh/id_rsa.pub`. If you'd like more information on SSH a good overview is
available here: [OpenSSH on WikiBooks](https://en.wikibooks.org/wiki/OpenSSH).

## Adding Keys From the Dashboard

Go under "Access & Security" -> SSH Keys and click "Import Key". This will
display a modal where you'll need to name your key, and provide the full
contents of your public key file located at `~/.ssh/id_rsa.pub`, and hit save.

![SSH Key Modal](/img/content/101/ssh-key-import.png)

This will allow your public key to be deployed with any new instance you
create, allowing you to access any instance you own securely, and without a
password. You can also quickly access the import screen from the launch
instance screen by clicking the add button next to the SSH key dropdown.

## Via the command line

If you haven't configured your OpenStack command line tools yet read [this
article](/101/installing-cli-tools) before continuing.

```asciidoc
$ nova keypair-add --pub_key ~/.ssh/id_rsa.pub my_awesome_key
```

To confirm that the operation worked, you can run

```asciidoc
$ nova keypair-list
```

Note that `my_awesome_key` is in the list now.

# Connecting

Depending on the type of instance that you've deployed, the username to connect
via SSH will be different. As a guide to the defaults, you can use the
following list to find out which user you should be using.

 - Ubuntu - ubuntu
 - Fedora - fedora
 - CentOS 7 - centos
 - CentOS 6 - root
 - Debian - debian

Then, since your SSH key is injected into the instance when it's created, you
can simply SSH in without a cumbersome password to a sudo-able user.

```asciidoc
$ ssh <user>@<floating_ip>
```
