$(document).ready(() => {
	let timeoutId;

	$(".notification-indicator").hover(indicatorHoverIn, indicatorHoverOut);

	function indicatorHoverIn() {
		fetch("https://github.com/notifications", {
			credentials: "same-origin"
		}).then(result => {
			return result.body.getReader().read();
		}).then(body => {
			return $($.parseHTML(new TextDecoder("utf-8").decode(body.value)));
		}).then(html => {
			const popover = $("<div></div>");
			popover.addClass("notifications-preview-popover");
			popover.append(html.find(".notifications-list"));

			popover.appendTo(document.body);

			popover.hover(popoverHoverIn, popoverHoverOut);
		});
	}

	function indicatorHoverOut() {
		timeoutId = setTimeout(() => {
			$(".notifications-preview-popover").remove();
		}, 100);
	}

	function popoverHoverIn() {
		clearTimeout(timeoutId);
	}

	function popoverHoverOut() {
		$(".notifications-preview-popover").remove();
	}

});