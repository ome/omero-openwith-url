OMERO.web openwith URL
======================

An OMERO.web plugin for opening images via configured URLs::

    $ omero config append omero.web.apps '"omero_openwith_url"'

    $ omero config append omero.web.open_with '["openwith_url", "https://hms-dbmi.github.io/vizarr?source=https%3A%2F%2Fs3.embassy.ebi.ac.uk%2Fidr%2Fzarr%2Fv0.1%2F$ID.zarr", {"script_url": "omero_openwith_url/openwith.js", "label":"vizarr"}]'


Dev install::

    $ cd omero_openwith_url
    $ pip install -e .

Or install from master branch on github::

    pip install git+git://github.com/will-moore/omero-openwith-url.git@master#egg=omero-openwith-url
