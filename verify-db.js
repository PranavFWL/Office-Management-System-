// Script to verify data in Neon database
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

async function verifyDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('Connecting to Neon database...');
    
    // Check employees table
    const employeesResult = await pool.query('SELECT * FROM employees');
    console.log('\n=== EMPLOYEES TABLE ===');
    console.log(`Found ${employeesResult.rows.length} employees:`);
    console.log(JSON.stringify(employeesResult.rows, null, 2));
    
    // Check projects table
    const projectsResult = await pool.query('SELECT * FROM projects');
    console.log('\n=== PROJECTS TABLE ===');
    console.log(`Found ${projectsResult.rows.length} projects:`);
    console.log(JSON.stringify(projectsResult.rows, null, 2));
    
    // Check attendance table
    const attendanceResult = await pool.query('SELECT * FROM attendance');
    console.log('\n=== ATTENDANCE TABLE ===');
    console.log(`Found ${attendanceResult.rows.length} attendance records:`);
    console.log(JSON.stringify(attendanceResult.rows, null, 2));
    
    // List all tables in the database
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('\n=== ALL TABLES ===');
    console.log(tablesResult.rows.map(row => row.table_name));
    
  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await pool.end();
  }
}

verifyDatabase(); 