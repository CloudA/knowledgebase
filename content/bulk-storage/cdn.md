/*
Title: Content Delivery Network
Sort: 4
*/

The Bulk Storage Content Deliver Network (CDN) was built to make your object 
storage accessible around the world with higher bandwidth and lower latency. 
Content served through the CDN is automatically served through the most 
geographically efficient edge node and cached for even faster access.

Edge nodes are populated dynamically based on demand in the region for the 
content, and requests from different regions are routed via DNS to their 
closest edge on our CDN domain blkstr.ca.

## Getting Started

To enable CDN on your container, you may simply configure it through the
dashboard in the Container management screen. You may enable CDN on a
per-container basis, so your private container data remains as such. CDN
enabled containers must be public-readable through the ACL.

All Bulk Storage CDN traffic is serviced via the shortened blkstr.ca domain, 
and urls are condensed to the following format:

```asciidoc
https://blkstr.ca/{tenant_id}/container/obj.ext
```
Note that http traffic will be automatically redirected to https.

After enabling CDN on a container and requesting an object, you can inspect 
the cache status of the object through the headers it has returned to you.

```asciidoc
X-CDN-Status: alive | dead
X-CDN-Cache: HIT | MISS | BYPASS
```

## Forced Updates

Given that your content is more dynamic, and updates are to a single file, you
can force an edge node to check and fetch the most recent version of a file by
passing a Cache Refresh header with your request. This will fetch a new version
of the file, bypass the cache, and populate it with the most up to date
content.

If you wish to force an update of an edge node's content, you may perform a
manual refresh on individual objects by passing a `X-CDN-Cache-Refresh` 
header with your GET request.

curl example
```asciidoc
curl -i -H "X-CDN-Cache-Refresh: yes" https://blkstr.ca/{tenant_id}/container/object.ext
```


