// make foreign objects draggable to jsTree
$('.jstree_draggable').on('mousedown', function (event) {
	$(this).wrap( "<div id='jstree-drag-element'></div>" );
	var dragHelper = '<div id="jstree-dnd" class="jstree-default"><i class="jstree-icon jstree-er"></i>' + $('#jstree-drag-element').html() + '<ins class="jstree-copy" style="display:none;">+</ins></div>';
	$(this).unwrap();

	return $.vakata.dnd.start(
		event,
		{
			'jstree' : true,
			'object' : $(this),
			'nodes' : [{
                'icon'		 : 'jstree-file',
                'text'		 : 'New Content Element',
				'data-ct-id' : $(this).attr('data-ct-id')
			}]
		},
		dragHelper
	);
});

// drag 'n drop event listeners for jsTree for foreign objects
$(document).bind("dnd_start.vakata", function(event, data) {
	console.log("jsTree - Start dnd");
	console.log("Data:");
	console.log(JSON.stringify(data.data.jstree));
	console.log(JSON.stringify(data.data.object));
	console.log(JSON.stringify(data.data.nodes));
	console.log("------------------");
})
.bind("dnd_stop.vakata", function(event, data) {
    console.log("jsTree - Stop dnd");
	console.log("Data:");
	console.log(JSON.stringify(data.data.jstree));
	console.log(JSON.stringify(data.data.object));
	console.log(JSON.stringify(data.data.nodes));
	console.log("------------------");
});

// jsTree callback functions
$('#cms_elements_controller_jstree').on('loaded.jstree', function (event, data) {
	$('#cms_elements_controller_jstree').jstree('open_all');
});

// drag 'n drop event listener for jsTree's internal node objects
$('#cms_elements_controller_jstree').on('move_node.jstree', function (event, data) {
	console.log("move_node - new position: " + data.position);
	console.log("move_node - old position: " + data.old_position);
	/*
	console.log("node: " + data.node);
	console.log("parent: " + data.parent);
	console.log("position: " + data.position);
	console.log("old_parent: " + data.old_parent);
	console.log("old_position: " + data.old_position);
	console.log("is_multi: " + data.is_multi);
	console.log("old_instance: " + data.old_instance);
	console.log("new_instance: " + data.new_instance);
	*/
});

$('#cms_elements_controller_jstree').on('select_node.jstree', function (event, data) {
	// switch element on element select
	$('#cms_element_jstree_selected_element').val($('#cms_elements_controller_jstree').jstree('get_selected'));
	$('#cms_element_selected_element').val('');
	$('#cms_element_editor_form').submit();
});

// called after creating the node in jstree. afterwards rename_node.jstree-callback
// will be called when user finished editing the node's name
$('#cms_elements_controller_jstree').on('create_node.jstree', function (event, data) {
	var node = data.node;
	var parent = data.parent;
	var position = data.position;

	$('#cms_edit_element_parent_id').val(node.parent);
	$('#cms_edit_element_action').val('create');
});

// called after user finished editing the node's name
$('#cms_elements_controller_jstree').on('rename_node.jstree', function (event, data) {
	var node = data.node;
	var text = data.text;
	var old = data.old;
	
	if ($('#cms_edit_element_action').val() != 'create') {
		$('#cms_edit_element_id').val(node.id);
		$('#cms_edit_element_action').val('rename');
	}

	$('#cms_edit_element_description').val(node.text);
	$('#cms_element_jstree_form').submit();
});

// called after deleting a jstree node
$('#cms_elements_controller_jstree').on('delete_node.jstree', function (event, data) {
	var node = data.node;
	var parent = data.parent;

	$('#cms_edit_element_id').val(node.id);
	$('#cms_edit_element_action').val('delete');
	$('#cms_element_jstree_form').submit();
});

// on click create new root element
$('#cms-element-editor-create-new-root-element').click(
	function() {
	    var tree = $('#cms_elements_controller_jstree').jstree(true);
		var node = tree.get_node("#");

		if (node.id === "#" || node.id.startsWith("_parent")) {
			node = tree.create_node(node, {"type":"folder"});
			tree.edit(node);
		} else {
			alert("New folders can only be created as root folders or as sub-folders in user created folders!");
		}

	}
);

// adopt cms content editor containers to parents height on window resize event
function resizeContentEditor() {
	if (typeof $('#element_editor_container_wrapper') !== typeof undefined && typeof $('#element_editor_container_wrapper').position() !== typeof undefined) {
		var calculatedHeight = window.innerHeight - $('#element_editor_container_wrapper').position().top - $('.main-footer').outerHeight(true) - $('.content').css('padding-top').replace('px', '') - $('.content').css('padding-bottom').replace('px', '');
	
		$('#element_editor_container_wrapper').height(calculatedHeight);
		
		$('#cms_element_jstree_container').height(calculatedHeight);
		$('#cms_element_editor_container').height(calculatedHeight);
		$('#cms_content_type_list_container').height(calculatedHeight);
		
		if (typeof $('#cms_content_type_editor_wrapper') !== typeof undefined && typeof $('#cms_content_type_editor_wrapper').position() !== typeof undefined) {
			$('#cms_content_type_editor_wrapper').height(calculatedHeight - $('#cms_content_type_editor_wrapper').position().top);
		}
	}
}

// bind functions to window resize event
$(window).resize(function() {
    resizeContentEditor();
});

// bind functions to document load event
$(document).ready(function() {
	if (typeof cms_elements_controller_jstree_config !== typeof undefined && cms_elements_controller_jstree_config) {
		// create jstree configs
		var jsTreeConfig = {
            "core" : {
                "multiple"       : false,
                "animation"      : 0,
                "check_callback" : function (op, node, par, pos, more) {
					/*
					if ((op === "move_node" || op === "copy_node") && node.type && node.type == "root") {
						return false;
					}
					if ((op === "move_node" || op === "copy_node") && more && more.core && !confirm('Are you sure ...')) {
						return false;
					}
					*/
					console.log("check_callback - op: " + op);
					console.log("check_callback - node: " + JSON.stringify(node));
					console.log("check_callback - par: " + JSON.stringify(par));
					console.log("check_callback - pos: " + JSON.stringify(pos));
					console.log("check_callback - more: " + JSON.stringify(more));
					console.log("-----------------------");
					return true;
				},
                "force_text"     : true,
                "themes"         : {"stripes" : false},
                "data"           : cms_elements_controller_jstree_config
			},
			"plugins" : ["contextmenu", "dnd", "html_data"],
			"contextmenu" : {
				"select_node" : false,
				"show_at_node" : true,
				"items" : {
					"createItem": {
						"label": "Create",
						"action": function (obj) {
							var tree = $('#cms_elements_controller_jstree').jstree(true);
							var node = tree.get_node(obj.reference);

							if (node.id === "#" || node.id.startsWith("_parent")) {
								node = tree.create_node(node, {"type":"folder"});
								tree.edit(node);
							} else {
								alert("New folders can only be created as root folders or as sub-folders in user created folders!");
							}
						}
					},
					"renameItem": {
						"label": "Rename",
						"action": function (obj) {
							var tree = $('#cms_elements_controller_jstree').jstree(true);
							var node = tree.get_node(obj.reference);

							if (node.id.startsWith("_parent")) {
								tree.edit(node);
							} else {
								alert("Only user created folders can be renamed!");
							}
						}
					},
					"deleteItem": {
						"label": "Delete",
						"action": function (obj) {
							var tree = $('#cms_elements_controller_jstree').jstree(true);
							var node = tree.get_node(obj.reference);
							
							if (node.id.startsWith("_parent")) {
								tree.delete_node(node);
							} else {
								alert("Only user created folders can be deleted!");
							}
						}
					}
				}
			}
		};
	}

	// create jstree object
	$('#cms_elements_controller_jstree').jstree(jsTreeConfig);
	
    resizeContentEditor();
});
