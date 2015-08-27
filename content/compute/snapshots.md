/*
Title: Using Instance Snapshots
*/

Snapshots are a handy way to create point in time stills of your instance's 
disk. Making it easier to re-deploy, or spin up multiple staging and test 
environments.

To snapshot an instance make sure the server is running, then click " Create 
Snapshot" in the more menu. This process will make your instance unavailable 
while an image is captured. This will take a few seconds, and your instance 
will automatically be powered back on when the process is complete.

Once the snapshot is captured, it is converted, compressed, and transferred 
over the network to our image and snapshot storage pool. The snapshot will 
appear as `queued` while the backend processes wait and work on your image. 
Once this process is complete, the snapshot will appear in the Images & 
Snapshots view in your Dashboard as `available`.

Now when you go to launch a new instance, you can choose from any existing 
snapshot (of equal or greater flavour size) to deploy a new server. The 
restriction on snapshot sizes exists because if a snapshot's formatted disk 
size is large, it cannot be deployed onto a smaller disk.
