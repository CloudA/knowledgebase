/*
Title: Change Instance CPU / RAM
*/

The process to increase your instance's RAM or CPU is as follows:

 - Create a [snapshot](/compute/snapshots) of your instance
 - Launch a new instance based on the snapshot, of a larger size 
 - Terminate your old instance

In place instance upgrades are currently not supported, but are on the 
development roadmap. We will make an announcement when this feature is 
available.
