/*
Title: CLI Cheat Sheet
Sort: 8
*/

Here is a list of common commands for reference, grouped by service.

## Identity (keystone)

Get a fresh token

```
$ keystone token-get 
```

List Identity service catalog

```
$ keystone catalog
```

## Images (glance)

List images you can access (both public, and uploaded)

```
$ glance image-list
```

Delete specified image

```
$ glance image-delete IMAGE
```

Show the details of a specific image

```
$ glance image-show IMAGE
```

Update image

```
$ glance image-update IMAGE
```

## Compute (nova)

List and check status of instances

```
$ nova list

+--------+---------+---------+------------+-------------+----------------------------------+
| ID     | Name    | Status  | Task State | Power State | Networks                         |
+--------+---------+---------+------------+-------------+----------------------------------+
| xxxxxx | test VM | ACTIVE  | -          | Running     | TestNet=192.168.168.8            |
....

```

List all available images.

```
$ nova image-list

+--------+---------------------+--------+--------------------------------------+
| ID     | Name                | Status | Server                               |
+--------+---------------------+--------+--------------------------------------+
| 7c62c9 | My Test Image       | ACTIVE | <server ID if snapshot>              |
....

```

List flavors, A.K.A VM Sizes to choose from when launching a new server via 
`nova boot`.

```
$ nova flavor-list

+--------+------------+-----------+------+-----------+------+-------+-------------+-----------+
| ID     | Name       | Memory_MB | Disk | Ephemeral | Swap | VCPUs | RXTX_Factor | Is_Public |
+--------+------------+-----------+------+-----------+------+-------+-------------+-----------+
| 179109 | 1 GB       | 1024      | 30   | 0         |      | 1     | 1.0         | True      |
| 347177 | 4 GB - HC  | 4096      | 60   | 0         |      | 4     | 1.0         | True      |
....

```

Boot an instance using flavor and image ID

```
$ nova boot --image IMAGE --flavor FLAVOR INSTANCE_NAME
```

Show details of instance, including VM state, security groups, NICs, last 
updated date.

```
$ nova show INSTANCE_ID

+-----------------------------+----------------------------+
| Property                    | Value                      |
+-----------------------------+----------------------------+
| DMZ Net network             | 192.168.168.8              | 
| OS-EXT-STS:power_state      | 1                          |
| OS-EXT-STS:task_state       | -                          |
| OS-EXT-STS:vm_state         | active                     |
| created                     | 2015-08-18T18:04:52Z       |
| flavor                      | 1 GB (179909)              |
| id                          | a7a441                     |
| image                       | test img (469e2c)          |
| key_name                    | Test Key                   |
| name                        | TestSvr                    |
| security_groups             | Ping, Web, default         |
| status                      | ACTIVE                     |
| updated                     | 2015-08-18T18:05:15Z       |
+-----------------------------+----------------------------+
```

View console log of instance. 

```
$ nova console-log INSTANCE_ID 

------------

System is starting...
Starting system maintenance...
Scanning /dev/vda1... (0%)   Scanning /dev/vda1... (100%)

System Started...

TestSvr Login:
```

Create an instance snapshot. Adding the `--poll` argument will ping back to 
the API server to check on the status until the snapshot has completed.

```
$ nova image-create [--poll] INSTANCE_ID SNAPSHOT_NAME 
```

### Pause, suspend, stop, & reboot an instance


Pause / Unpause. This leaves the VM fully on and in memory, with execution 
halted.

```
$ nova pause INSTANCE_ID 
$ nova unpause INSTANCE_ID 
```

Suspend / Resume. The equivalent of hibernate functionality, all memory is 
written to disk and the system is halted. On resume, the system is started 
and system state is loaded from the save point.

```
$ nova suspend NAME
$ nova resume NAME
```

Shutdown / Boot / Reboot. A hard reboot is a force stop, standard reboot 
issues a soft shutdown command to the server via ACPI to allow it to stop 
running processes. 

```
$ nova stop NAME
$ nova start NAME
$ nova reboot NAME
$ nova reboot --hard NAME
```

### Manage security groups

Add rules to default security group allowing ping and SSH between
instances in the default security group

```
$ nova secgroup-add-group-rule default default icmp -1 -1
$ nova secgroup-add-group-rule default default tcp 22 22
```

## Networking (neutron)

A collection of handy commands for working with Cloud-A's virtual networking 
stack.

Create network & subnet

```
$ neutron net-create NAME
$ neutron subnet-create NETWORK_ID CIDR
```

View all public IPs in your pool, and which servers they're assigned to.

```
$ neutron floatingip-list

+--------+------------------+---------------------+---------+
| id     | fixed_ip_address | floating_ip_address | port_id |
+--------+------------------+---------------------+---------+
| 017219 | 192.168.100.11   | 204.256.0.184       | bfe4d3d |
....
```
## Block Storage (cinder)

The Block Storage APIs are used to manage volumes and volume snapshots that 
attach to instances.

Create a new volume

```
$ cinder create SIZE_IN_GB --display-name NAME
```

List volumes, notice status of volume

```
$ cinder list

+--------+-----------------+----------------+------+-------------+----------+--------+
| ID     |      Status     |  Display Name  | Size | Volume Type | Bootable | Attach |
+--------+-----------------+----------------+------+-------------+----------+--------+
| f5ecd9 |    available    |  Test Volume   | 100  |     SSD     |  false   |        |
| fe6d6f |      in-use     | Backup Volume  | 100  |     SSD     |  false   | 024213 |
+--------+-----------------+----------------+------+-------------+----------+--------+
```

Attach volume to instance after instance is active, and volume is
available.

```
$ nova volume-attach INSTANCE_ID VOLUME_ID(/dev/vdb) auto
```

Manage volumes & filesystems after login into the instance

```
# fdisk -l
# mkfs.ext4 /dev/vdb
```

Test it out by mounting and writing to the volume.

```
# mkdir /backups
# mount /dev/vdb /backups
# touch /backups/test.txt
# ls /backups
test.txt
```
