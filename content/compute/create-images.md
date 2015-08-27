/*
Title: Creating Custom Images
*/

Before getting started, it's highly recommended that you read the 
[OpenStack Image Guide Introduction](http://docs.openstack.org/image-guide/content/ch_introduction.html)
to get an understanding of the process required to get an image to be 
OpenStack-ready. OpenStack provides a list of 
[pre-built, prepped images](http://docs.openstack.org/image-guide/content/ch_obtaining_images.html) 
that are all available via our image library and work out of the box on 
Cloud-A as base images.

## Brass Tacks

If you need to create one from scratch, and cannot start from a base-image. We
suggest reviewing the official 
[Custom Images](http://docs.openstack.org/image-guide/content/ch_creating_images_manually.html)
chapter in the OpenStack documentation for full step-by-step examples on 
creating a new image. We suggest that you start by creating a qcow2 KVM 
image on your local machine, mount the installation ISO you desire, and 
configure it as required by OpenStack in the above links -- once ready, you 
can continue to upload your image as outlined below.

## Converting an Existing Disk

There are a few key requirements that we'll overview that are most often
snagged on while building these images, and best practises. Full detail can be
found in the official examples.

To prepare a Windows server image, most importantly, you'll need to install
VirtIO drivers so you're able to connect your disk, and network once it's
loaded up. You can download the ISO from the 
[Fedora Project Site](http://alt.fedoraproject.org/pub/alt/virtio-win/archives/virtio-win-0.1-30/) 
to install on your existing VM or hardware. Read more about a full Windows 
Image build on the 
[official documentation](http://docs.openstack.org/image-guide/content/windows-image.html).

Linux servers will have the VirtIO drivers if it's a modern kernel. We highly
suggest installing the "cloud-init" package, which we pre-install on all of our
base image to standardize the boot / initialization process to automatically
configure your server based on your dashboard configurations.  
[Read more](http://docs.openstack.org/image-guide/content/ch_openstack_images.html) 
about the full requirements on a Linux server.

Once everything is ready, you can convert the disks to the correct format 
( qcow2 ), there are some instructions on the 
[OpenStack Image Guide](http://docs.openstack.org/image-guide/content/ch_converting.html) 
on using the tool, simply, it can be accomplished with the following command:

```
qemu-img convert -f <server_disk_format> -O qcow2 server.vdi -o compat=0.10 server.qcow2
```

## Uploading to our Image Server
To upload to our Image Library, you will need to install the CLI tools for
`glance`. Check out more information on [installing](/101/installing-cli-tools) 
& [authenticating](/101/authenticating-cli-tools) with the CLI tools to get
bootstrapped.

An example glance upload command would look like this:

```
glance image-create --name "My Base Image" --disk-format qcow2 --container-format bare --file server.qcow2
```

If you do run into any challenges or have any questions while creating or
converting your image, please reach out to our support team!
