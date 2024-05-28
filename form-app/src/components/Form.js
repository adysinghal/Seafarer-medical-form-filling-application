import React from 'react'

function Form() {
    return (
        <div>
            <div className="container">
                <div class="row my-3">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="First name" aria-label="first-name" />
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Form