<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Triggered Events](#triggered-events)
  - [`cmb_pre_init`](#cmb_pre_init)
  - [`cmb_init`](#cmb_init)
  - [`postbox-toggled`](#postbox-toggled)
  - [`cmb_media_modal_init`](#cmb_media_modal_init)
  - [`cmb_media_modal_select`](#cmb_media_modal_select)
  - [`cmb_media_modal_open`](#cmb_media_modal_open)
  - [`cmb2_add_group_row_start`](#cmb2_add_group_row_start)
  - [`cmb2_add_row`](#cmb2_add_row)
  - [`cmb2_remove_group_row_start`](#cmb2_remove_group_row_start)
  - [`cmb2_remove_row`](#cmb2_remove_row)
  - [`cmb2_shift_rows_enter`](#cmb2_shift_rows_enter)
  - [`cmb2_shift_rows_start`](#cmb2_shift_rows_start)
  - [`cmb2_shift_rows_complete`](#cmb2_shift_rows_complete)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Triggered Events

CMB2 has several events that get triggered during various client-side interactions. Some events are triggered directly on the `document` object, and some are triggered on specific elements. As with all jQuery event callbacks, the first parameter sent to the callback is the event object, but with the CMB2 events, other parameters are also provideed, including the `CMB2` object. Source: [`js/cmb2.js`](https://github.com/CMB2/CMB2/blob/229213a241a1c049c5ba1c47aa176823ea6a9b21/js/cmb2.js#L1027-L1037)

### `cmb_pre_init`
____
Triggered before CMB2 starts setting up its functionality, on the document ready event.

### `cmb_init`
____
Triggered when CMB2 finishes setting up its functionality, on the document ready event. If you want to add functionality related to CMB2's other events, this is the best event to hook into to ensure CMB2 is setup/ready.

### `postbox-toggled`
____
Triggered when the metabox is expanded/collopsed, and borrows the event name from the core WordPress metabox Javascript. The `.postbox` element that was toggled is passed to the callback as the 2nd parameter.

### `cmb_media_modal_init`
____
Triggered when a WordPress media modal instance is created to handle the various CMB2 media file types. Is also passed the `CMB2.media` object (as well as the default `CMB2` object).

### `cmb_media_modal_select`
____
Triggered when a selection is made inside the CMB2 media modal instance. Is also passed the current selection object, and the `CMB2.media` object (as well as the default `CMB2` object).

### `cmb_media_modal_open`
____
Triggered when a CMB2 media modal instance is opened. Is also passed the current selection object, and the `CMB2.media` object (as well as the default `CMB2` object).

### `cmb2_add_group_row_start`
____
Triggered when the 'Add group row' button is clicked, before CMB2 performs its actions. Is triggered on the 'add group row' buton  (`.cmb-add-group-row`), as well as passed that button element.

### `cmb2_add_row`
____
Triggered when the 'Add row'/'Add group row' buttons are clicked. Is triggered on the CMB2 Group element (`.cmb-repeatable-group`). The callback event will have a `group` property to determine if event was triggered on the 'Add row' or the 'Add group row' button. Also passed the new row jQuery element object.

### `cmb2_remove_group_row_start`
____
Triggered when the 'Remove group row' button is clicked, before CMB2 performs its actions. Is triggered on the CMB2 Group element (`.cmb-repeatable-group`), and is passed the 'remove group row' button.

### `cmb2_remove_row`
____
Triggered when the 'Remove row'/'Remove group row' buttons are clicked. Is triggered on the CMB2 Group element (`.cmb-repeatable-group`). The callback event will have a `group` property to determine if event was triggered on the 'Remove row' or the 'Remove group row' button.

### `cmb2_shift_rows_enter`
____
Triggered when the 'move up'/'move down' buttons are clicked, before CMB2 performs its actions (before shift occurs). Is triggered on the button element (`.cmb-shift-rows'`). The callback event will be passed the jQuery button element, the jQuery "from" element (the element to be moved), and the jQuery "to" element (the element to be replaced/moved).

### `cmb2_shift_rows_start`
____
Triggered when the 'move up'/'move down' buttons are clicked, before CMB2 performs its actions (before the shift, but confirmed shift should occur). Is triggered on the button element (`.cmb-shift-rows'`). The callback event will be passed the jQuery button element, the jQuery "from" element (the element to be moved), and the jQuery "to" element (the element to be replaced/moved).

### `cmb2_shift_rows_complete`
____
Triggered when the 'move up'/'move down' buttons are clicked, after CMB2 performs its actions (shift is complete). Is triggered on the button element (`.cmb-shift-rows'`). The callback event will be passed the jQuery button element, the jQuery "from" element (the element to be moved), and the jQuery "to" element (the element to be replaced/moved).
