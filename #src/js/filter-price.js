
if (document.querySelector(".filter-price__body")) {
    let sliderPrice = document.querySelector('.filter-price__body');
    let input0 = document.querySelector('.filter-price__set_lower');
    let input1 = document.querySelector('.filter-price__set_higher');
    let inputs = [input0, input1];
    
    noUiSlider.create(sliderPrice, {
        start: [2000, 150000],
        connect: true,
        step: 1000,
        // tooltips: [true, true],
        range: {
            'min': 0,
            'max': 200000
        },
        format: {
            // 'to' the formatted value. Receives a number.
            to: function (value) {
                return Math.round(value);
            },
            // 'from' the formatted value.
            // Receives a string, should return a number.
            from: function (value) {
                return Number(value.replace('', ''));
            }
        }
    });
    
    sliderPrice.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = values[handle];
    });
    
    inputs.forEach(function (input, handle) {
        input.addEventListener('change', function () {
            sliderPrice.noUiSlider.setHandle(handle, Math.round(this.value));
        });
    
        input.addEventListener('keydown', function (e) {    
            var values = sliderPrice.noUiSlider.get();
            var value = Number(values[handle]);
            // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
            var steps = sliderPrice.noUiSlider.steps();
            // [down, up]
            var step = steps[handle];
            var position;
            // 13 is enter,
            // 38 is key up,
            // 40 is key down.
            switch (e.which) {
                case 13:
                    sliderPrice.noUiSlider.setHandle(handle, this.value);
                    break;
                case 38:
                    // Get step to go increase slider value (up)
                    position = step[1];
                    // false = no step is set
                    if (position === false) {
                        position = 1;
                    }
                    // null = edge of slider
                    if (position !== null) {
                        sliderPrice.noUiSlider.setHandle(handle, value + position);
                    }
                    break;
                case 40:
                    position = step[0];
                    if (position === false) {
                        position = 1;
                    }
                    if (position !== null) {
                        sliderPrice.noUiSlider.setHandle(handle, value - position);
                    }
                    break;
            }
        });
    });
};
