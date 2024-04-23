
const customers = [];


for (let i = 0; i < 10; i++) {
    $('#tbl-customer-body').append(`
        <tr>
             <td class="text-center">${i}</td>
             <td class="text-center">System Architect</td>
             <td class="text-center">Edinburgh</td>
             <td class="text-center">61</td>
             <td class="text-center">2011-04-25</td>
             <td class="text-center">$320,800</td>
             <td class="text-center">$320,800</td>
             <td class="text-center">$320,800</td>
             <td class="text-center">$320,800</td>
        </tr>
    `)
}