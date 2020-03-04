/*
Title: Using Instance Snapshots
Sort: 1
*/

Snapshots are a handy way to create point in time stills of your instance's 
disk. Making it easier to re-deploy, or spin up multiple staging and test 
environments.

To snapshot an instance make sure the server is running, then click " Create 
Snapshot" in the more menu. This process will make your instance unavailable 
while an image is captured. This will take a few seconds, and your instance 
will automatically be powered back on when the process is complete.

The snapshot service will issue an ACPI shutdown command to your running OS to
gracefully shut down, and will wait for 60 seconds, sending multiple shutdown
events during that window. If the window is exceeded, the instance will have
its runtime terminated from the hypervisor and the snapshot process will
continue from there. If an OS completely ignores the power events, the hard
shutdown can result in a snapshot disk that contains incomplete writes or is
inconsistent. If you're unsure of whether your OS is listening to the events,
the absolute safest way to create a consistent snapshot is to shut down your OS
safely from within the instance, then issue the snapshot once it has powered
off from the dashboard.

Once the snapshot is captured, it is converted, compressed, and transferred 
over the network to our image and snapshot storage pool. The snapshot will 
appear as `queued` while the backend processes wait and work on your image. 
Once this process is complete, the snapshot will appear in the Images & 
Snapshots view in your Dashboard as `available`.

The process of capturing a snapshot, working on it in the snapshot workspace,
and uploading it to the image service for use takes more time in direct
proportion to the size of your root disk. For example, if you have a 50GB full
root disk, and it takes 1 hour to complete the entire workflow, you can expect
a 500GB disk to take 10 hours to be available after the instance has resumed.

Now when you go to launch a new instance, you can choose from any existing 
snapshot (of equal or greater flavour size) to deploy a new server. The 
restriction on snapshot sizes exists because if a snapshot's formatted disk 
size is large, it cannot be deployed onto a smaller disk.
