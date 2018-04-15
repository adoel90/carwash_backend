var register = function(Handlebars) {
    var helpers = {
        xif: function(gst) {
            if (gst === 0) {
                return "INVOICE"
            } else {
                return "TAX INVOICE"
            }
        },
        companyIf: function(data) {
            if (data.id !== 1) {
                var address = data.address ? `<p>${data.address}</p>` : '',
                    phone = data.phone ? `<p>Phone : ${data.phone}</p>` : '',
                    fax = data.fax ? `<p>FAX : ${data.fax}</p>` : '',
                    email = data.email ? `<p>Email : ${data.email}</p>` : '';

                var dataCompany = address + phone + fax + email;

                return dataCompany;
            }
        },
        rowLeft: function(data) {
            let count = Object.keys(data).length;
            let result = [];
            let row = "";
            
            for(let i=0; i<count; i++) {
                if (Object.keys(data)[i] % 2 === 0 ) {
                    result.push(data[i])
                }
            }

            for(let j=0; j<result.length; j++) {
                row += "<tr>\
                    <td>" + result[j].id + "</td>\
                    <td>" + result[j].name + "</td>\
                    <td>" + result[j].market + "</td>\
                    <td>" + result[j].low + "</td>\
                    <td>" + result[j].high + "</td>\
                <tr>";
            }

            return row;
        },
        rowRight: function(data) {
            let count = Object.keys(data).length;
            let result = [];
            let row = "";
            
            for(let i=0; i<count; i++) {
                if (Object.keys(data)[i] % 2 === 1 ) {
                    result.push(data[i])
                }
            }

            for(let j=0; j<result.length; j++) {
                row += "<tr>\
                    <td>" + result[j].id + "</td>\
                    <td>" + result[j].name + "</td>\
                    <td>" + result[j].market + "</td>\
                    <td>" + result[j].low + "</td>\
                    <td>" + result[j].high + "</td>\
                <tr>";
            }

            return row;
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // for (var prop in helpers) {
        //     Handlebars.registerHelper(prop, helpers[prop]);
        // }
        Handlebars.registerHelper("xif", function (expression, options) {
            return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
        });
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);