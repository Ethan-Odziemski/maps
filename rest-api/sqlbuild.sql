-- Pipes build steps, use the single line exacution 
-- drop if up
DROP table pipes;

create table pipes (
pipeID int,
active boolean,
desciption varchar(255),
PRIMARY KEY (pipeID)
);

-- coordinates build steps, use the single line exacution
-- drop if up
DROP table coordinates;

CREATE table coordinates (
pipeID int,
section int,
lat decimal(20,7),
lng decimal(20,7)
);