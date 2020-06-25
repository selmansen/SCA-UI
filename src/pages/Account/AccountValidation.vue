<template>
      <div class="q-pa-xl account account-validation">
        <h2 color="grey">Account <small>Please continue with your application process</small></h2>
        <q-card class="q-pa-lg">
            <div class="row">
                <div class="col-sm-6 q-pa-lg">
                    <h3>Please upload your relevant documents from the following list:</h3>
                    <ul>
                        <li>Government Issued Photo ID document(s)</li>
                        <li>Current Passport, Driver Licence etc.</li>
                        <li>Proof of Residency</li>
                        <li>Document, such as your most recent bank statement or utility bill</li>
                    </ul>
                </div>
                <div class="col-sm-6 q-pa-lg">
                    <h3> Upload Document(s)</h3>
                    <p>Supported file types include image files, PDFs and Word documents up to a maximum size of 5MB</p>
                    <q-btn color="primary" label="Upload"></q-btn>
                </div>
            </div>
            <small class="info"><i class="material-icons">info</i>If you are unsure of which documents to provide, please refer to your email or contact us via <a>live chat</a></small>
        </q-card>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
    .account-validation {
        color: #5a5a5a;

        h3 {
            font-size: 22px;
            color: $primary;
            line-height: 22px;
            margin-bottom: 20px;
        }

        ul {
            padding-left:15px;
            margin:0;

            li {
                line-height: 22px;
                list-style-type:decimal;
            }
        }

        button {
            width: 100%;
        }
        small.info {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-style: italic;
            margin: 20px 0;

            i {
                margin-right: 5px;
            }

            a {
                display: inline-block;
                margin-left: 3px;
                color: $primary;
            }
        }
    }
</style>
