const addCompletedBtn = () => {
    return new Promise((resolve, reject) => {
        try{
            const btn = document.createElement('button');
            btn.setAttribute('type', 'button');
            btn.setAttribute('id', 'completed_btn');
            btn.addEventListener('click', () => {    
                // A reference to the editor editable element in the DOM.
                const domEditableElement = document.querySelector('#comment_text');
                var $editor = $(domEditableElement).data('editor');
                if ($editor){
                    $editor.setData(`<table><tbody><tr><td><strong>What was the exact root cause of the issue? </strong><span style="color:rgb(230,77,77);"><strong>* </strong></span><strong>(text)</strong></td><td>Never discuss a process</td></tr><tr><td><strong>How did we fix it? </strong><span style="color:rgb(230,77,77);"><strong>* </strong></span><strong>(text)</strong></td><td>Just unplug your brain and pretend everything is fine</td></tr><tr><td><strong>Is there any new/change in dblogs? </strong><span style="color:rgb(230,77,77);"><strong>* </strong></span><strong>(yes/no)</strong></td><td>no</td></tr><tr><td><strong>Is there any configuration changed via XML Contexts? </strong><span style="color:rgb(230,77,77);"><strong>* </strong></span><strong>(yes/no)</strong></td><td>no</td></tr><tr><td><strong>Did we run any tests to avoid regressions? </strong><span style="color:rgb(230,77,77);"><strong>*</strong></span><strong> (no/manual/unit/functional/testim)</strong></td><td>&nbsp;</td></tr></tbody></table>`);
                }                
                $('[name=data_id_resolution').val('5004002').change();
                $('[name=data_id_rootissue').val('5005207').change();
                $('[name=data_id_impact').val('5004454').change();
                $('[name=data_id_integration').val('5004450').change();
            });
            const td = document.createElement('td');
            td.append(btn);
            btn.classList.add('btn', 'btn--classic', 'btn--default');
            btn.innerText = 'fill completed comment';
            document.querySelector('[name=save_comment]').closest('td').after(td);
            return resolve();
        }
        catch(err){
            return reject();
        }        
      });    
}
const addCrBtn = () => {
    return new Promise((resolve, reject) => {
        try{
            const crbtn = document.createElement('button');
            crbtn.setAttribute('type', 'button');
            crbtn.addEventListener('click', () => {    
                // A reference to the editor editable element in the DOM.
                const cke = document.querySelector('#comment_text');
                var $editor = $(cke).data('editor');
                if ($editor){
                    $editor.setData(`<table><tbody><tr><td><strong>Was the Code review validated? </strong><span style="color:rgb(230,77,77);"><strong>*</strong></span><strong> (yes/no)</strong></td><td>Yes</td></tr><tr><td><strong>Was functional impact checked? </strong><span style="color:rgb(230,77,77);"><strong>*</strong></span><strong> (yes/no)</strong></td><td>Yes</td></tr><tr><td><strong>Was technical impact checked? </strong><span style="color:rgb(230,77,77);"><strong>*</strong></span><strong> (yes/no)</strong></td><td>Yes</td></tr><tr><td><strong>“Completed” check-list available? </strong><span style="color:rgb(230,77,77);"><strong>*</strong></span><strong> (yes/no)</strong></td><td>Yes</td></tr></tbody></table>`);
                }                
                $('[name=data_id_resolution').val('5004367').change();
            });            
            const cell = document.createElement('td');
            cell.append(crbtn);
            crbtn.classList.add('btn', 'btn--classic', 'btn--default');
            crbtn.innerText = 'fill CR comment';
            document.getElementById('completed_btn').closest('td').after(cell);            
            return resolve();
        }
        catch(err){
            return reject();
        }        
      });    
}
addCompletedBtn()
    .then(() => addCrBtn())
