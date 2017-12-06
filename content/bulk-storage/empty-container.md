/*
Title: Swift CLI | Empty Container
Sort: 2
*/

The Dashboard Bulk Storage functionality suffices for getting started with with
Swift by allowing you to create, upload, download and delete individual files.
The real power to an RESTful object storage system lies in the API and
subsequently the fully featured CLI clients for working with the API.

A common request is to completely empty out a container with hundreds to
thousands, or millions of objects stored. Deleting them 1 page at a time via
the Dashboard would be tedious to say the least. So as an example, I've whipped
together a simple bash script that can accomplish the task of emptying a Bulk
Storage container by issuing a single command.

## Initial Setup

To get started, you'll need access to a Linux operating system (Ubuntu 14.04 is
used in this example), if you don't run Linux locally -- you can simply create
a 512MB Server on Cloud-A, and if you destroy it when complete, it will likely
cost a few pennies.

You'll need to have the following additional dependencies installed on your
system in order to use the script.

    - curl
    - python-keystoneclient
    - python-swiftclient

(note requirement names align with Ubuntu, other OS package managers will
have similar names but may not be exact)

Next, visit this page in the dashboard:

```asciidoc
https://dash.clouda.ca/project/api_access/
```

Then download your CLI Authentication File, and take note of your *Tenant ID*
listed on that page.

## Example Script

```bash

TENANT=$1
CONTAINER=$2
SWIFT_ENDPOINT="ca-ns-1.bulkstorage.ca:8444/v1/AUTH_$TENANT"
TOK=$(keystone token-get | grep " id " | awk -F'|' '{ print $3 }')

obj_limit=8500

container_url=https://$SWIFT_ENDPOINT/$(python -c "import urllib, sys; print urllib.quote(\"\"\"$CONTAINER\"\"\")")
objs=($(curl -H "X-Auth-Token: $TOK" $container_url?limit=$obj_limit))

echo "Parsing container $CONTAINER / $container_url"
while [ "${#objs[@]}" -gt 0 ]; do
    echo "Deleting ${#objs[@]} objects"
    for (( j="${#objs[@]}"; j>=0; j-- )); do
        obj=${objs[j]}
        if [ -z "$obj" ] || [ "$obj" == "." ]; then
            continue
        fi
        echo -n "---- Object $obj ... "
        obj_url=https://$SWIFT_ENDPOINT/$(python -c "import urllib, sys; print urllib.quote(\"\"\"$CONTAINER/$obj\"\"\")")
        curl -X DELETE -H "X-Auth-Token: $TOK" $obj_url &>/dev/null
        if [ "$?" -eq 0 ]; then
            echo "deleted."
        else
            echo "failed to delete."
        fi
    done
    sleep 5
    objs=($(curl -H "X-Auth-Token: $TOK" $container_url?limit=$obj_limit))
done
echo -n "--- Container $CONTAINER ... "
read -n 1 -p "Delete $CONTAINER? {y/n} " swift_delete_cont_confirm
if [ "$swift_delete_cont_confirm" != "y" ]; then
    exit
fi

curl -X DELETE -H "X-Auth-Token: $TOK" $container_url &>/dev/null
if [ "$?" -eq 0 ]; then
    echo "deleted."
else
    echo "failed to delete."
fi

```

## Running the Script

In order to run the script,

```asciidoc
$ chmod +x empty_container.sh
$ source openrc.sh
   { enter password when prompted }

$ ./empty_container.sh (tenant ID) (container name)

   ...
```

Then wait for all the fun to happen! This will iterate over, and delete all
objects in the container in batches. After all objects have been deleted, the
script will prompt whether or not you wish to delete the container.
