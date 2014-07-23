perl -lwne 'BEGIN{$status=0;
print "tests running..."};
print qq{$_:};
$result = qx{curl -s -IL $_ | grep "200 OK"};
if ($result eq ""){print "FAIL\n"; $status=1} else {print $result};
END{if($status != 0){print "Some tests failed."} else {print "All done!"};
exit $status}' test.config
