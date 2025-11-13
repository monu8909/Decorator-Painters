# Security Considerations

This document outlines security and privacy tradeoffs for the Decorator & Painters application.

## File Storage vs Database

### Current Implementation: JSON File Storage

**Pros:**
- Simple setup, no database server required
- Easy to backup (just copy the JSON file)
- Suitable for small-scale operations
- No additional infrastructure costs

**Cons:**
- Not suitable for high-traffic applications
- No concurrent write protection
- Limited query capabilities
- Risk of data corruption if multiple processes write simultaneously
- No built-in data validation or constraints

**Recommendations for Production:**
- For production use with multiple concurrent users, migrate to a proper database (PostgreSQL, MongoDB, etc.)
- Implement database connection pooling
- Use transactions for data integrity
- Add database-level constraints and validation

## Photo Upload Security

### Current Implementation

**Security Measures:**
- File type validation (images only: JPG, PNG, GIF, WEBP)
- File size limit (10MB per file)
- Unique filename generation to prevent overwrites
- Files stored in `server/uploads/` directory

**Security Concerns:**
- Files are stored on the local filesystem
- No virus/malware scanning
- No image processing/optimization
- Direct file access via `/uploads/` endpoint

**Recommendations:**
1. **File Validation:**
   - Implement server-side file signature checking (magic numbers)
   - Scan files for malware using antivirus APIs
   - Validate image dimensions and aspect ratios

2. **Storage Options:**
   - **Option A**: Use cloud storage (AWS S3, Google Cloud Storage, Azure Blob)
     - Better scalability
     - Built-in CDN capabilities
     - Automatic backups
   - **Option B**: Process and optimize images before storage
     - Resize large images
     - Convert to standardized formats
     - Generate thumbnails

3. **Access Control:**
   - Implement signed URLs for file access
   - Add authentication for viewing uploaded photos
   - Consider watermarking client photos

4. **Privacy:**
   - Photos may contain sensitive information (home interiors, personal items)
   - Implement data retention policies
   - Allow clients to request photo deletion
   - Encrypt sensitive photos at rest

## Admin Token Management

### Current Implementation

**Security Measures:**
- Token stored in environment variable
- Token required in `x-admin-token` header
- Token stored in browser localStorage (for convenience)

**Security Concerns:**
- Single static token (no expiration)
- Token stored in localStorage (vulnerable to XSS attacks)
- No rate limiting on admin endpoints
- No audit logging of admin actions

**Recommendations:**
1. **Token Management:**
   - Implement JWT tokens with expiration
   - Use refresh tokens for long sessions
   - Implement token rotation
   - Store tokens in httpOnly cookies instead of localStorage

2. **Authentication:**
   - Add username/password authentication
   - Implement two-factor authentication (2FA)
   - Add session management
   - Log all admin actions

3. **Authorization:**
   - Implement role-based access control (RBAC)
   - Different permission levels (view-only, edit, delete)
   - Audit trail for sensitive operations

## Data Privacy

### Personal Information Collected

The application collects:
- Names
- Phone numbers
- Email addresses
- Physical addresses
- Photos of client properties

### Privacy Considerations

1. **Data Storage:**
   - All data stored in plain JSON files (not encrypted)
   - No data encryption at rest
   - No data encryption in transit (unless HTTPS is used)

2. **Recommendations:**
   - **Encryption:**
     - Encrypt sensitive data fields (addresses, phone numbers)
     - Use HTTPS in production (TLS 1.2+)
     - Encrypt JSON files at rest
   
   - **Data Retention:**
     - Implement data retention policies
     - Allow clients to request data deletion (GDPR compliance)
     - Archive old bookings instead of deleting
   
   - **Access Control:**
     - Limit admin access to necessary data only
     - Implement data masking for non-essential fields
     - Log all data access

   - **Compliance:**
     - Consider GDPR compliance for EU clients
     - Implement privacy policy
     - Add consent mechanisms for data collection
     - Provide data export functionality for clients

## API Security

### Current Implementation

**Security Measures:**
- CORS enabled (allows cross-origin requests)
- Basic input validation
- File upload restrictions

**Security Concerns:**
- No rate limiting
- No request size limits (except file uploads)
- CORS allows all origins
- No API versioning
- No request logging/monitoring

**Recommendations:**
1. **Rate Limiting:**
   - Implement rate limiting per IP
   - Different limits for public vs admin endpoints
   - Use libraries like `express-rate-limit`

2. **CORS:**
   - Restrict CORS to specific origins in production
   - Use environment variables for allowed origins

3. **Input Validation:**
   - Use validation libraries (Joi, express-validator)
   - Sanitize all user inputs
   - Implement request size limits

4. **Monitoring:**
   - Log all API requests
   - Monitor for suspicious activity
   - Set up alerts for failed authentication attempts

## Production Deployment Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use secure secret management (AWS Secrets Manager, etc.)
   - Rotate secrets regularly

2. **HTTPS:**
   - Always use HTTPS in production
   - Use valid SSL certificates
   - Implement HSTS headers

3. **Error Handling:**
   - Don't expose sensitive error messages to clients
   - Log detailed errors server-side only
   - Implement proper error pages

4. **Backup:**
   - Regular backups of booking data
   - Backup uploaded photos
   - Test backup restoration procedures

5. **Updates:**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Use `npm audit` regularly

## Summary

This application is designed for small-scale operations. For production use with higher traffic or sensitive data:

1. Migrate to a proper database
2. Implement cloud storage for photos
3. Add proper authentication/authorization
4. Encrypt sensitive data
5. Implement rate limiting and monitoring
6. Use HTTPS and secure headers
7. Add compliance features (GDPR, etc.)

The current implementation prioritizes simplicity and ease of setup, which is appropriate for small businesses but should be enhanced for larger-scale deployments.

