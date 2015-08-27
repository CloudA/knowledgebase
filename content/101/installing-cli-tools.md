/*
Title: Installing CLI Tools
*/

The recommended way to install the OpenStack CLI clients is via Python PIP. If
you are using Linux, there may also be packages available from your
distribution. These packages are typically out of date.

First, make sure you have the python `setuptools` and packaging tool `pip` 
available. If you do not have `easy_install` installed, you can follow the
official install documentation.

```
# Mac OSX
$ easy_install pip
# Ubuntu / Debian
$ apt-get install python-pip
# Windows
C:\> easy_install pip
```

The following pip install command will install the all of the OpenStack clients
that we have support for, and you can use to do advanced operations using our
services. We make use of

 - Nova - Compute API
 - Keystone - Authentication client, often used to get tokens, or list services.
 - Glance - Imaging client, commonly used for uploading base images.
 - Cinder - Volumes client, allows you to manage (create / delete / attach) 
 your volume storage.
 - Neutron - Advanced Networking client, performs a slew of networking operations.
 - Swift - Block storage client, enables file upload/download and container 
 management.

Installing the toolset is simple:

```
$ pip install python-novaclient python-keystoneclient python-glanceclient python-cinderclient python-neutronclient python-swiftclient

Downloading/unpacking python-novaclient
Running setup.py egg_info for package python-novaclient
Installed
/home/.../django-basic/build/python-novaclient/pbr-0.8.2-py2.7.egg
[pbr] Excluding argparse: Python 2.6 only dependency
[pbr] Processing SOURCES.txt
Downloading/unpacking python-keystoneclient
Downloading python-keystoneclient-0.8.0.tar.gz (247Kb): 247Kb
downloaded
Running setup.py egg_info for package python-keystoneclient
Installed
/home/.../django-basic/build/python-keystoneclient/pbr-0.8.2-py2.7.egg
Downloading/unpacking python-glanceclient
Downloading python-glanceclient-0.12.0.tar.gz (123Kb):
123Kb downloaded
Running setup.py egg_info for package
python-glanceclient
Installed
/home/.../django-basic/build/python-glanceclient/pbr-0.8.2-py2.7.egg
.......
```

And there you have it! You now have the set of command line tools required 
to interface with Cloud-A. Next you will want to  configure your system to 
authenticate using your Cloud-A credentials.
