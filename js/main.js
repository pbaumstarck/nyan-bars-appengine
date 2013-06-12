
$(document).ready(function() {
  function getProgressFunction() {
    var ctr = 0;
    return function() {
      ctr += 6;
      // if (ctr >= 150) {
      //   return (ctr = (ctr - 150) % 100);
      // } else if (ctr > 100) {
        // return -1;
      if (ctr > 100) {
        return ctr %= 100;
      } else {
        return ctr;
      }
    };
  }
  var bars = [{
    name: "Doodles",
    pattern: "[-|+]*"
  }, {
    name: "Doodles with animation",
    pattern: "{-|+}*"
  }, {
    name: "Kirby",
    pattern: "_*{<|^|(|v}{(|(|>|(}'{o|-|o|.}'{<|)|)|)}{)|^|>|v}"
  }, {
    name: "Kitty",
    patterns: [
      "=(^-^)=",
      "{_|\\\\}(u_u)"
    ]
  }, {
    name: "Nyan cat",
    patterns: [
      "{-|_}*,------,  ",
      "{_|-}*|   /\\\\_/\\\\",
      "{-|_}*|__( ^ .^)",
      "{_|-}* {{\"| }}\"{{ |\"}} {{\"| }}\"{{ |\"}}  "
    ]
  }, {
    name: "Uniform animation",
    pattern: "{{/|\\\\}}*"
  }, {
    name: "Ode to Star Trek II",
    pattern: "KH{{A|a}}*N!"
  }, {
    name: "Nyan Cat",
    pattern: "{~|=}*\\[[..|,,]x[,,|..]\\]:3"
  }, {
    name: "Pulse going forward",
    pattern: "{_|\\\\|/|_}*"
  }, {
    name: "Pulse going backward",
    pattern: "{_|/|\\\\|_}+"
  }, {
    name: "Multi-line bar",
    patterns: ["{{/|\\\\}}*", "{{\\\\|/}}*"]
  }, {
    name: "American flag",
    patterns: [
      "{*| }*#*",
      "{ |*}* *",
      "{*| }*#*",
      "{ |*}* *",
      "{*| }*#*",
      "[  ]*",
      "[##]*",
      "[  ]*",
      "[##]*"
    ]
  }];

  var placeBar = function(div, obj, prepend, enableSave) {
    var which = obj.patterns ? "multi" : "single";
    var id = which + "Bar" + ("" + Math.random()).substr(2);
    (prepend ? div.prepend : div.append).call(div,
        "<div id=\"" + id + "\" class=\"" + which + " bar-set\">" +
          "<div class=\"title\"></div>" +
          "<div class=\"pattern\"></div>" +
          "<div class=\"buttons\">" +
            (enableSave ? "<div class=\"save\">Save</div>" : "") +
            "<div class=\"close\">Close</div>" +
          "</div>" +
          "<div class=\"bar live-bar\"></div>" +
          "<div class=\"bar stalled-bar\"></div>" +
        "</div>");
    $("#" + id + " .title").html(obj.name);
    $("#" + id + " .pattern").html(
        obj.pattern ? obj.pattern : obj.patterns.join("<br>"));
    // var bar = obj.pattern ? parseNyanBar(obj.pattern) : new MultiSegment({
      // bars: obj.patterns
    // });
    if (enableSave) {
      $("#" + id + " .save").click(function() {
        // Insert this thing.
        placeBar($("#savedBars"), obj, true);
      });
    }
    $("#" + id + " .close").click(function() {
      $("#" + id).remove();
    });
    // progressBar({
    //   div: $("#" + id + " .live-bar"),
    //   nyanBar: bar.clone(),
    //   charSize: charSize,
    //   progressFunction: getProgressFunction(),
    //   showProgress: true
    // });
    $("#" + id + " .live-bar").nyanBar({
      charSize: charSize,
      pattern: obj.pattern,
      patterns: obj.patterns,
      progressFunction: getProgressFunction(),
      showProgress: true
    });
    // progressBar({
    //   div: $("#" + id + " .stalled-bar"),
    //   nyanBar: bar.clone(),
    //   charSize: charSize,
    //   progressFunction: function() { return 50; },
    //   showProgress: true
    // });
    $("#" + id + " .stalled-bar").nyanBar({
      charSize: charSize,
      pattern: obj.pattern,
      patterns: obj.patterns,
      progressFunction: function() { return 50; },
      showProgress: true
    });
  };

  var div = $("#singleBars");
  var charSize = 50;
  for (var i = 0; i < bars.length; ++i) {
    placeBar(div, bars[i]);
  }

  // var lastCustom = parseNyanBar();
  $("#text").keyup(function(e) {
    var id = "id" + ("" + Math.random()).substr(2);
    var patterns = $(this).val().split(/\n/);
    console.log(patterns);
    try {
      var leDiv = $("#customBars");
      leDiv.empty();
      placeBar(leDiv, {
        name: "Your custom progress bar",
        patterns: patterns
      }, false, true);
    } catch (e) {
      // Keep the last valid thing.
      return;
    }
    //$("#customBars").append("<div id=\"" + id + "\"></div>");
    //$("#" + id).html("GAR:");
  });
});
