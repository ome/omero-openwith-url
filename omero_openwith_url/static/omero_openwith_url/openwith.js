
// omero config append omero.web.open_with '["openwith_url", "https://hms-dbmi.github.io/vizarr?source=https%3A%2F%2Fs3.embassy.ebi.ac.uk%2Fidr%2Fzarr%2Fv0.1%2F$ID.zarr", {"script_url": "omero_openwith_url/openwith.js", "label":"vizarr"}]'


function getIdrIdForNode(node) {
    let idrId = node.id;
    // for testing IDR images imported to other OMERO.servers,
    // we can rename the images to be the IDR ID
    let idFromName = parseInt(node.name);
    if (!isNaN(idFromName)) {
        idrId = idFromName;
    }
    return idrId;
}

function getJsTreeContextMenuItem(label) {
    let $element;
    $(".jstree-contextmenu").find('li').each(function () {
        let $li = $(this);
        let itemText = $li.text();
        // Find the child <li> with label
        if (itemText.trim() === label) {
            $element = $li;
        }
    });
    return $element;
}

// See https://docs.openmicroscopy.org/omero/5.6.2/developers/Web/LinkingFromWebclient.html#open-with
// Here we set an 'enabled' handler that is passed a list of selected objects
OME.setOpenWithEnabledHandler("openwith_url", function (selected, callback) {
    // selected is a list of objects containing id, name, type

    // Only support single image
    if (selected.length !== 1 || selected[0].type !== 'image') {
        return false;
    }

    let idrId = getIdrIdForNode(selected[0]);

    // We need to test whether image ID is available here...
    let url = `https://s3.embassy.ebi.ac.uk/idr/zarr/v0.1/${idrId}.zarr/.zgroup`;

    fetch(url, { mode: 'cors'})
        .then(response => {
            // If response is OK (not 404 or 403) etc, we use callback to update menu item
            callback(response.ok);
        })

    // Menu item is enabled, but may be disabled when fetch() returns.
    return true;
});


// The URL provider returns a function, so that we can test
// for the disabled flag added above and do nothing if 'disabled'
OME.setOpenWithUrlProvider("openwith_url", function (selected, url) {
    let idrId = getIdrIdForNode(selected[0]);
    return url.replace('$ID', idrId);
});
