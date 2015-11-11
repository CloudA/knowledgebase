/*
Title: Booting an Instance from a Volume
*/

While in most use cases booting from an image or snapshot directly is sufficient,
sometimes using a volume as opposed to ephemeral root disks is desirable. Booting
from a volume has the following advantages:

* You aren't limited by the ephemeral disk space allocated to a specific flavour
* Volumes can persist beyond an instance's life (portability)
* You can build an image on a volume while it is attached to another instance

Before getting started, please make sure that you have the [CLI Toolset](/101/installing-cli-tools)
installed.

## Creating your volume

There are two ways to create your volume to prepare it as a root disk.

### Option 1 - From an existing image / snapshot

Get a list of images that are available to retreive the image ID:

```
$ nova image-list

+--------------------------------------+------------------------------------+--------+--------+
| ID                                   | Name                               | Status | Server |
+--------------------------------------+------------------------------------+--------+--------+
| 1d9b293e-cba0-4306-80da-a6392cabe319 | CentOS 6 i386                      | ACTIVE |        |
| 28c077ac-1352-4821-9f2c-dbc8855e9df1 | CentOS 6 x86_64                    | ACTIVE |        |
| 64653f86-1897-4767-bf3a-e6416b4bb074 | CentOS 7 x86_64 (10/02/15)         | ACTIVE |        |
| 787cba9d-bdbb-4f3a-9c39-50db9688faf5 | CentOS 7 x86_64 (12/02/15)         | ACTIVE |        |
| a1ced3fb-af70-40f6-adbe-89e6301fdfd0 | CentOS 7 x86_64 (20/10/14)         | ACTIVE |        |
| 24adac27-ca19-48e7-90b2-c38bc480693f | CoreOS                             | ACTIVE |        |
| 4a48c61e-bf88-4d82-bf07-52796700f22f | Debian 7 (20/10/14)                | ACTIVE |        |
| 6cfef669-4897-4d19-aa7c-6f0087d7c13b | Fedora 19 i386                     | ACTIVE |        |
| 011c9957-920f-4446-b7bf-8d60b15c6d54 | Fedora 19 x86_64                   | ACTIVE |        |
| 769cf0aa-c5f2-4e69-8a49-70f9c9efcd93 | Fedora 20 x86_64 (29/09/14)        | ACTIVE |        |
| 251557ed-ffc6-407d-ac93-110892445dc6 | Fedora 21 x86_64 (02/01/14)        | ACTIVE |        |
| 63ba4a7a-0909-4e7b-b62e-f146f0140e8b | Ubuntu 12.04 i386                  | ACTIVE |        |
| 8b20af24-1946-4fe5-a7c3-ad908c684712 | Ubuntu 12.04 x86_64                | ACTIVE |        |
| d3336991-3472-4ab6-8168-cac26f0b6d50 | Ubuntu 12.04 x86_64 (29/09/14)     | ACTIVE |        |
| 249d6dc3-235e-4021-86a1-a3636ac3f134 | Ubuntu 14.04 x86_64 (29/09/14)     | ACTIVE |        |
| a1718edf-f2b4-436a-9c06-af2630e09908 | Windows Server 2008 R2             | ACTIVE |        |
| fbd2a49a-d514-442e-a541-24ff0d539646 | Windows Server 2012 R2             | ACTIVE |        |
+--------------------------------------+------------------------------------+--------+--------+
```

In our example, we'll create a volume based on an Ubuntu 14.04 image with a 15GB size.

```
$ cinder create --image-id 249d6dc3-235e-4021-86a1-a3636ac3f134 --display-name Ubuntu-14.04 15

+---------------------+--------------------------------------+
|       Property      |                Value                 |
+---------------------+--------------------------------------+
|     attachments     |                  []                  |
|  availability_zone  |                 nova                 |
|       bootable      |                false                 |
|      created_at     |      2015-11-11T14:23:32.710621      |
| display_description |                 None                 |
|     display_name    |             Ubuntu-14.04             |
|      encrypted      |                False                 |
|          id         | d86de794-60cb-4725-8e8d-e9f4e097b63e |
|       image_id      | 249d6dc3-235e-4021-86a1-a3636ac3f134 |
|       metadata      |                  {}                  |
|         size        |                  15                  |
|     snapshot_id     |                 None                 |
|     source_volid    |                 None                 |
|        status       |               creating               |
|     volume_type     |                 None                 |
+---------------------+--------------------------------------+
```

Depending on the size of your image, it may take some time for volume creation to complete. You can
use `cinder list` or `cinder show <VOLUME_ID>` to check on the status of your volume.

### Option 2 - Using an existing instance to build your volume

While we won't get into specific steps around creating a bootable OS on your volume, we'll be outlining
the basic steps around attaching a volume to an instance here.

First step is to create our volume. We'll be creating a volume named `my-custom-vol` with a size of 30GB.

```
$ cinder create --display-name my-custom-vol 30

+---------------------+--------------------------------------+
|       Property      |                Value                 |
+---------------------+--------------------------------------+
|     attachments     |                  []                  |
|  availability_zone  |                 nova                 |
|       bootable      |                false                 |
|      created_at     |      2015-11-11T14:27:12.582382      |
| display_description |                 None                 |
|     display_name    |            my-custom-vol             |
|      encrypted      |                False                 |
|          id         | 3646ab44-e6b2-41d6-85ae-cc3dfbfb8f9a |
|       metadata      |                  {}                  |
|         size        |                  30                  |
|     snapshot_id     |                 None                 |
|     source_volid    |                 None                 |
|        status       |               creating               |
|     volume_type     |                 None                 |
+---------------------+--------------------------------------+
```

Next, we'll need to attach the volume to an existing instance. 

```
$ nova list
+--------------------------------------+-------------------+--------+------------+-------------+---------------------------+
| ID                                   | Name              | Status | Task State | Power State | Networks                  |
+--------------------------------------+-------------------+--------+------------+-------------+---------------------------+
| 95bc8519-a757-4736-a623-0974132240c4 | existing-instance | ACTIVE | -          | Running     | Demo Network=10.200.100.6 |
| e0b06da5-6231-4a6f-8485-2204962178e7 |        Test       | ACTIVE | -          | Running     | Demo Network=10.200.100.5 |
+--------------------------------------+-------------------+--------+------------+-------------+---------------------------+

$ nova volume-attach 95bc8519-a757-4736-a623-0974132240c4 3646ab44-e6b2-41d6-85ae-cc3dfbfb8f9a 
```

From there, you will need to perform the following generic steps:

* Login to your instance (SSH / RDP)
* Format and mount your newly attached volume
* Load your appropriate OS files onto the volume
* Ensure that the volume is a bootable disk
* Unmount the volume

Once those steps have been completed, we'll go ahead and detach the volume from our instance.

```
$ nova volume-detach 95bc8519-a757-4736-a623-0974132240c4 3646ab44-e6b2-41d6-85ae-cc3dfbfb8f9a 
```

## Booting your instance

Now that we have created a bootable volume, we'll need to create an instance using it as its root disk.
These steps can also be used to attach a volume on boot, simply replace `vda` with another device name
(like `vdb`).

The required `nova boot` parameter to boot from a volume is `--block-device-mapping <dev-name>=<id>:<type>:<size(GB)>:<delete-on-terminate>`
where:

* `<dev-name>`: The device name seen by the instance's OS. We'll be using `vda` since we want this to be
our root disk.
* `<id>`: The ID of the object we'll be using. In this case, it's our volume ID.
* `<type>`: Can either be `snap` or nothing. We will leave it blank since we aren't using a snapshot.
* `<size(GB)>`: We'll be leaving this blank since the compute service will be able to smartly read
the size of our volume.
* `<delete-on-terminate>`: Can be set to `0`(False) or `1`(True). Whether or not we want to have our device 
deleted when the instance is deleted. If set to `1`, the volume will only live as long as your instance
is alive.

Before booting, we'll need to collect IDs for the flavour and network we'll want to use. Remember that the flavour's
disk size allocation is no longer relevant since we'll be using a volume as our root disk.

```
$ nova flavor-list

+--------------------------------------+------------+-----------+------+-----------+------+-------+-------------+-----------+
| ID                                   | Name       | Memory_MB | Disk | Ephemeral | Swap | VCPUs | RXTX_Factor | Is_Public |
+--------------------------------------+------------+-----------+------+-----------+------+-------+-------------+-----------+
| 1791eb32-68a1-4ec9-ac8d-e2374ca9c909 | 1 GB       | 1024      | 30   | 0         |      | 1     | 1.0         | True      |
| 34719f08-452d-4e8d-a29f-548d82985477 | 4 GB - HC  | 4096      | 60   | 0         |      | 4     | 1.0         | True      |
| 569d85f5-647c-420d-98e6-85149e6eebf6 | 32 GB - HM | 32768     | 60   | 0         |      | 6     | 1.0         | True      |
| 64c94219-1452-4934-a09a-d702c9370c3d | 8 GB - HM  | 8192      | 60   | 0         |      | 2     | 1.0         | True      |
| 677cac99-6a5a-4c6a-9884-23338d01c04d | 2 GB       | 2048      | 60   | 0         |      | 1     | 1.0         | True      |
| 75518817-da1b-4fbf-bd11-dffce8e73b49 | 8 GB - HC  | 8192      | 60   | 0         |      | 8     | 1.0         | True      |
| 885f9496-5de5-4894-bab9-98ef88e4892c | 8 GB       | 8192      | 120  | 0         |      | 4     | 1.0         | True      |
| b5ae8e6f-03f3-4146-9add-6e84e6944ead | 4 GB       | 4096      | 80   | 0         |      | 2     | 1.0         | True      |
| baec2dce-b1ea-4898-a259-9a3bf66f6262 | 512 MB     | 512       | 10   | 0         |      | 1     | 1.0         | True      |
| cdb1ff78-66ea-4848-a93e-f843a75c7f59 | 16 GB - HC | 16384     | 60   | 0         |      | 12    | 1.0         | True      |
| d0e71e26-1d9e-4476-bf8b-11d32dc30483 | 16 GB - HM | 16384     | 60   | 0         |      | 4     | 1.0         | True      |
| e989b4c4-4aa2-4b5c-8086-d3f407fb131f | 16 GB      | 16384     | 200  | 0         |      | 6     | 1.0         | True      |
| f021e071-261c-43e3-b1d7-834bc714e06b | 32 GB      | 32768     | 200  | 0         |      | 8     | 1.0         | True      |
+--------------------------------------+------------+-----------+------+-----------+------+-------+-------------+-----------+

$ neutron net-list

+--------------------------------------+--------------+------------------------------------------------------+
| id                                   | name         | subnets                                              |
+--------------------------------------+--------------+------------------------------------------------------+
| 7bc79d7b-0d04-488b-9513-b4695988840e | Demo Network | 28359fd5-5858-4ad3-94f4-673a31927603 10.200.100.0/24 |
+--------------------------------------+--------------+------------------------------------------------------+

```

In this example, we'll use the *4 GB* flavour and boot our instance on the *Demo Network*. 

```
nova boot --flavor b5ae8e6f-03f3-4146-9add-6e84e6944ead --block-device-mapping vda=3646ab44-e6b2-41d6-85ae-cc3dfbfb8f9a:::0 \
--nic net-id=7bc79d7b-0d04-488b-9513-b4695988840e boot-from-vol
```

Our `--block-device-mapping` parameter is telling `nova` that we want a device called `vda` with volume ID `3646ab44-e6b2-41d6-85ae-cc3dfbfb8f9a`,
it's not a snapshot, we want `nova` to determine the size automatically, and we don't want our volume to be deleted when our
instance is terminated.
