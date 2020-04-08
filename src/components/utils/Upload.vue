<template>
    <div class="upload">
        <label class="file" id="fileLabel">
            <input type="file" id="file">
            <span class="file-custom">123</span>
        </label>
    </div>
</template>

<script>

    export default {
        name : "upload",
        methods: {
            uploadFunc : function (document) {
                let input = document.getElementById("file");
                let label = document.getElementById("fileLabel");

                input.addEventListener( 'change', function( e )
                {
                    let fileName = '';
                    fileName = e.target.value.split( '\\' ).pop();
                    label.querySelector( 'span' ).innerHTML = fileName;
                });

                // Firefox bug fix
                input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
                input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
            }
        },
        mounted() {
            this.uploadFunc(document);
        }
    }
</script>

<style scoped>
    .file {
        position: relative;
        display: inline-block;
        cursor: pointer;
        height: 40px;
        box-sizing: border-box;
    }
    .file input {
        min-width: 14rem;
        margin: 0;
        filter: alpha(opacity=0);
        opacity: 0;
    }
    .file-custom {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 5;
        height: 40px;
        padding: .5rem 1rem;
        line-height: 1.5;
        color: #555;
        background-color: #fff;
        border: .075rem solid #ddd;
        border-radius: .25rem;
        box-shadow: inset 0 .2rem .4rem rgba(0,0,0,.05);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: left;
    }
    .file-custom:before {
        position: absolute;
        top: -.075rem;
        right: -.075rem;
        bottom: -.075rem;
        z-index: 6;
        display: block;
        content: "选择文书";
        height: 20px;
        padding: .5rem 1rem;
        line-height: 1.5;
        color: #555;
        background-color: #eee;
        border: .075rem solid #ddd;
        border-radius: 0 .25rem .25rem 0;
    }

    /* Focus */
    .file input:focus ~ .file-custom {
        box-shadow: 0 0 0 .075rem #fff, 0 0 0 .2rem #0074d9;
    }
</style>
