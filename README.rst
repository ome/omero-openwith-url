.. image:: https://github.com/ome/omero-openwith-url/workflows/OMERO/badge.svg
    :target: https://github.com/ome/omero-openwith-url/actions

OMERO.web openwith URL
======================

An OMERO.web plugin for opening images via configured URLs::

    $ omero config append omero.web.apps '"omero_openwith_url"'

    $ omero config append omero.web.open_with '["openwith_url", "https://hms-dbmi.github.io/vizarr?source=https%3A%2F%2Fs3.embassy.ebi.ac.uk%2Fidr%2Fzarr%2Fv0.1%2F$ID.zarr", {"script_url": "omero_openwith_url/openwith.js", "label":"vizarr"}]'


Dev install::

    $ cd omero_openwith_url
    $ pip install -e .

Or install from master branch on github::

    pip install git+git://github.com/ome/omero-openwith-url.git@master#egg=omero-openwith-url


How it works
============

The `open_with` config above adds an `vizarr` option to the Open-with menu of webclient.
It also loads the static/omero_openwith_url/openwith.js script into the webclient.

When the open-with contextmenu is opened, we use the Image ID to ping
`https://s3.embassy.ebi.ac.uk/idr/zarr/v0.1/IMAGE_ID.zarr/.zgroup`. If we get
any error, the `Open-with > vizarr` menu item is disabled.

If the menu item it clicked, we Open the url configured above, replacing the $ID
with the ID of the chosen Image.

NB: to enable testing this when the actual ID of the Image doesn't match the
IDR ID.zarr (when we're not running this on IDR itself), if the Image name starts with
a number, so that parseInt(name) gives us a number, that will be used instead
of the image ID e.g. Name an Image like `6001240_B1_C1.tif` to Open `6001240.zarr`.
