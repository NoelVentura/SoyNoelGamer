(function() {
    var pressedKeys = {};

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        switch(code) {
        case 32:
            key = 'SPACE'; break;
        case 37:
            key = 'LEFT'; break;
        case 38:
            key = 'UP'; break;
        case 39:
            key = 'RIGHT'; break;
        case 40:
            key = 'DOWN'; break;
        case 88:
            key = 'JUMP'; break;
        case 90:
            key = 'RUN'; break;
        default:
            key = String.fromCharCode(code);
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        },
        reset: function() {
          pressedKeys['RUN'] = false;
          pressedKeys['LEFT'] = false;
          pressedKeys['RIGHT'] = false;
          pressedKeys['DOWN'] = false;
          pressedKeys['JUMP'] = false;
          var held = document.querySelectorAll('.touch-controls .is-down');
          for (var i = 0; i < held.length; i++) {
            held[i].classList.remove('is-down');
          }
        }
    };

    function wantsTouchControls() {
        if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return true;
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    }

    function setupTouchControls() {
        var root = document.getElementById('touch-controls');
        if (!root) return;

        var pointers = {};

        function releasePointer(e) {
            var rec = pointers[e.pointerId];
            if (!rec) return;
            delete pointers[e.pointerId];

            var stillHeld = false;
            for (var id in pointers) {
                if (pointers[id].key === rec.key) stillHeld = true;
            }
            if (!stillHeld) {
                pressedKeys[rec.key] = false;
                rec.btn.classList.remove('is-down');
            }
        }

        var buttons = root.querySelectorAll('[data-key]');
        for (var i = 0; i < buttons.length; i++) {
            (function(btn) {
                var key = btn.getAttribute('data-key');
                btn.addEventListener('pointerdown', function(e) {
                    if (e.pointerType === 'mouse' && e.button !== 0) return;
                    e.preventDefault();
                    pointers[e.pointerId] = { key: key, btn: btn };
                    pressedKeys[key] = true;
                    btn.classList.add('is-down');
                    try { btn.setPointerCapture(e.pointerId); } catch (err) {}
                });
                btn.addEventListener('pointerup', releasePointer);
                btn.addEventListener('pointercancel', releasePointer);
                btn.addEventListener('contextmenu', function(e) { e.preventDefault(); });
            })(buttons[i]);
        }

        window.addEventListener('pointerup', releasePointer);
        window.addEventListener('pointercancel', releasePointer);

        if (wantsTouchControls()) {
            document.body.classList.add('touch-play');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupTouchControls);
    } else {
        setupTouchControls();
    }
})();
